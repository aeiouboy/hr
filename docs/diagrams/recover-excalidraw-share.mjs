#!/usr/bin/env node
import { inflateSync } from "node:zlib";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { webcrypto } from "node:crypto";

const [, , shareId, shareKey, outFile] = process.argv;

if (!shareId || !shareKey || !outFile) {
  console.error("Usage: node recover-excalidraw-share.mjs <share-id> <share-key> <out-file>");
  process.exit(1);
}

function decodeConcatBuffers(buffer) {
  const bytes = new Uint8Array(buffer);
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const version = view.getUint32(0, false);
  if (version !== 1) {
    throw new Error(`Unsupported concat buffer version: ${version}`);
  }

  const chunks = [];
  let offset = 4;
  while (offset < bytes.length) {
    const length = view.getUint32(offset, false);
    offset += 4;
    chunks.push(bytes.slice(offset, offset + length));
    offset += length;
  }

  return chunks;
}

async function fetchPayload(id) {
  const urls = [
    `https://json.excalidraw.com/api/v2/${id}`,
    `https://json.excalidraw.com/api/v2/get/${id}`,
    `https://json.excalidraw.com/api/v2/${id}/`,
  ];

  const errors = [];
  for (const url of urls) {
    const response = await fetch(url);
    if (response.ok) {
      const arrayBuffer = await response.arrayBuffer();
      if (arrayBuffer.byteLength > 0) {
        return arrayBuffer;
      }
    }
    errors.push(`${url} -> ${response.status}`);
  }

  throw new Error(`Could not fetch Excalidraw payload: ${errors.join(", ")}`);
}

async function decryptExcalidraw(payload, key) {
  const [encodingMetaBytes, iv, encryptedData] = decodeConcatBuffers(payload);
  const encodingMeta = JSON.parse(new TextDecoder().decode(encodingMetaBytes));

  if (encodingMeta.version !== 2 || encodingMeta.encryption !== "AES-GCM") {
    throw new Error(`Unsupported Excalidraw encoding: ${JSON.stringify(encodingMeta)}`);
  }

  const cryptoKey = await webcrypto.subtle.importKey(
    "jwk",
    { kty: "oct", k: key, alg: "A128GCM", ext: true, key_ops: ["decrypt"] },
    { name: "AES-GCM" },
    false,
    ["decrypt"],
  );

  const decrypted = await webcrypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    cryptoKey,
    encryptedData,
  );

  const inflated = inflateSync(Buffer.from(decrypted));
  const [, dataBytes] = decodeConcatBuffers(inflated);
  return new TextDecoder().decode(dataBytes);
}

const payload = await fetchPayload(shareId);
const json = await decryptExcalidraw(payload, shareKey);
JSON.parse(json);

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, json);
console.log(outFile);
