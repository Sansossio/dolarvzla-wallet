export class RpcResponseErrorDto {
  code: number
  message: string
}

export class RpcResponseDto {
  id: string
  result: any
  error: null | RpcResponseErrorDto
}
