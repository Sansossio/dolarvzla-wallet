export function clearToken (token: string): string {
  return token.replace(/^bearer\s+/i, '')
}
