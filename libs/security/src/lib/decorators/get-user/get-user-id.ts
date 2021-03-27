export function getUserId (req): string | null {
  if (req.user) {
    return req.user.id
  }
  return req?.tokenData?.sub || null
}
