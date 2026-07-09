/**
 * Mock async helpers for UI mockup phase.
 * NOT for production — all calls resolve via setTimeout.
 */

export function delay(ms = 300): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function mockSubmit<T>(payload: T, ms = 300): Promise<T> {
  await delay(ms);
  return payload;
}

export async function mockProgress(
  steps: number,
  onTick: (step: number) => void,
  msPerStep = 250,
): Promise<void> {
  for (let i = 1; i <= steps; i++) {
    await delay(msPerStep);
    onTick(i);
  }
}
