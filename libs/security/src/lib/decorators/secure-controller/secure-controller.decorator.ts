import { applyDecorators, Controller, UseGuards } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'
import { LoggedGuard } from '../../guard/logged/logged.guard'

export const SecureController = (path?: string) => applyDecorators(
  Controller(path),
  ApiBearerAuth(),
  UseGuards(LoggedGuard)
)
