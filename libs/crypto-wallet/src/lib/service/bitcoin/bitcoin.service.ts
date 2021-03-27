import { Injectable } from '@nestjs/common'
import { BaseService } from '../base.service'
import { v4 as uuidv4 } from 'uuid'
import { NewWalletDto } from '../dto/new-wallet.dto'
import { AvailableMethodsRpc } from './dto/available-methods.enum'
import { RpcResponseDto } from './dto/rpc-response.dto'

@Injectable()
export class BitcoinService extends BaseService {
  private readonly domain = this.config.get('bitcoin.rpc.domain')
  private readonly port = this.config.get('bitcoin.rpc.port')
  private readonly username = this.config.get('bitcoin.rpc.username')
  private readonly password = this.config.get('bitcoin.rpc.password')

  private async rpcRequest<T> (method: AvailableMethodsRpc, params: any[], path = ''): Promise<T> {
    const url = `http://${this.username}:${this.password}@${this.domain}:${this.port}/${path}`
    const {
      data: response
    } = await this.httpService.post<RpcResponseDto>(
      url,
      {
        jsonrpc: '2.0',
        id: uuidv4(),
        method,
        params
      }
    ).toPromise()
    return response.result
  }

  async createRandomWallet (): Promise<NewWalletDto> {
    const walletName = uuidv4()
    const { name } = await this.rpcRequest<{ name: string }>(AvailableMethodsRpc.CREATEWALLET, [walletName])
    const address = await this.rpcRequest<string>(AvailableMethodsRpc.GETNEWADDRESS, [], `wallet/${name}`)

    return {
      name,
      address
    }
  }
}
