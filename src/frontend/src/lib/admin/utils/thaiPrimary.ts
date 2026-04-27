// Thai-primary label gate — label must contain ≥1 Thai char (U+0E00..U+0E7F)
// to prevent regression where admins ship English-only nav labels.
export function validateThaiPrimary(label: string): boolean {
  return /[฀-๿]/.test(label || '');
}
