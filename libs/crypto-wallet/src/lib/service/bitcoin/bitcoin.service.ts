import { Injectable } from '@nestjs/common'
import { BaseService } from '../base.service'
import { v4 as uuidv4 } from 'uuid'
import { NewWalletDto } from '../dto/new-wallet.dto'
import { AvailableMethodsRpc } from './dto/available-methods.enum'
import { RpcResponseDto } from './dto/rpc-response.dto'
import { WalletBalanceDto } from '../dto/wallet-balance.dto'
import { Currency } from '@dolarvzla-wallet/models'

@Injectable()
export class BitcoinService extends BaseService {
  type = Currency.BITCOIN

  private readonly rpcConfig = {
    domain: this.config.get('bitcoin.rpc.domain'),
    port: this.config.get('bitcoin.rpc.port'),
    username: this.config.get('bitcoin.rpc.username'),
    password: this.config.get('bitcoin.rpc.password')
  }

  private async rpcRequest<T> (method: AvailableMethodsRpc, params: any[] = [], path = ''): Promise<T> {
    const url = `http://${this.rpcConfig.username}:${this.rpcConfig.password}@${this.rpcConfig.domain}:${this.rpcConfig.port}/${path}`
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

  private getWalletPath (walletName: string) {
    return `wallet/${walletName}`
  }

  async listWallets (): Promise<string[]> {
    return (await this.rpcRequest<string[]>(AvailableMethodsRpc.LISTWALLETS)).filter(val => !!val)
  }

  async generateNewAddress (walletName: string) {
    return this.rpcRequest<string>(AvailableMethodsRpc.GETNEWADDRESS, [], this.getWalletPath(walletName))
  }

  async createRandomWallet (): Promise<NewWalletDto> {
    const walletName = uuidv4()
    const { name } = await this.rpcRequest<{ name: string }>(AvailableMethodsRpc.CREATEWALLET, [walletName])

    return {
      name,
      address: await this.generateNewAddress(walletName)
    }
  }

  async getBalance (walletName: string): Promise<WalletBalanceDto> {
    const balance = await this.rpcRequest<number>(AvailableMethodsRpc.GETBALANCE, [], this.getWalletPath(walletName))

    return {
      balance
    }
  }
}
