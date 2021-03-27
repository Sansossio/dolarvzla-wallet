import { ApiProperty } from '@nestjs/swagger'

export class ErrorDto {
  @ApiProperty()
  statusCode: number

  @ApiProperty({ example: 'Error message' })
  message: string
}
