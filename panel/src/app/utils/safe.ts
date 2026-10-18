export function checkSafeName(name: string) {
  if (name === undefined || name === null || name.length === 0) return false;
  name = String(name).trim();
  if (name.length === 0) return false;
  return /^[A-Za-z0-9-_]+$/.test(name);
}

/**
 * Strict validation for user API keys.
 *
 * Why this must be strict: `getUuidByApiKey()` looks keys up through
 * `QueryWrapper.selectPage()`, and `LocalFileSource` treats any condition value
 * starting with `%` as a LIKE query. A value such as `%` would therefore match
 * every user instead of a single key. Requiring only alphanumerics means the
 * value can never be interpreted as a wildcard (or any other query syntax).
 *
 * Panel-generated keys are `v4()` with dashes stripped, i.e. `[0-9a-f]{32}`, so
 * this check never rejects a key produced by the panel itself.
 */
export function checkApiKey(apiKey: unknown): boolean {
  if (apiKey === undefined || apiKey === null) return false;
  // Deliberately no trim(): a key with surrounding whitespace is not the key.
  return /^[A-Za-z0-9]+$/.test(String(apiKey));
}
