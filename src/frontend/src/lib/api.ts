import { getSession } from 'next-auth/react';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api';
const MAX_RETRIES = 2;
const RETRY_DELAY = 1000;

export interface ApiError {
  status: number;
  message: string;
  details?: unknown;
}

async function getAuthHeaders(): Promise<HeadersInit> {
  const session = await getSession();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (session?.accessToken) {
    headers['Authorization'] = `Bearer ${session.accessToken}`;
  }
  return headers;
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  retries = MAX_RETRIES
): Promise<T> {
  const url = `${BASE_URL}${path}`;
  const headers = await getAuthHeaders();

  const init: RequestInit = { method, headers };
  if (body) {
    init.body = JSON.stringify(body);
  }

  try {
    const res = await fetch(url, init);

    if (!res.ok) {
      const error: ApiError = {
        status: res.status,
        message: res.statusText,
      };
      try {
        error.details = await res.json();
      } catch {}

      if (res.status >= 500 && retries > 0) {
        await new Promise((r) => setTimeout(r, RETRY_DELAY));
        return request<T>(method, path, body, retries - 1);
      }

      throw error;
    }

    if (res.status === 204) return undefined as T;
    return res.json();
  } catch (err) {
    if ((err as ApiError).status) throw err;

    if (retries > 0) {
      await new Promise((r) => setTimeout(r, RETRY_DELAY));
      return request<T>(method, path, body, retries - 1);
    }
    throw { status: 0, message: 'Network error' } as ApiError;
  }
}

export const api = {
  get: <T>(path: string) => request<T>('GET', path),
  post: <T>(path: string, body?: unknown) => request<T>('POST', path, body),
  patch: <T>(path: string, body?: unknown) => request<T>('PATCH', path, body),
  delete: <T>(path: string) => request<T>('DELETE', path),
};
