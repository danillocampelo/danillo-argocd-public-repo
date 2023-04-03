import {forwardRef, Inject, Injectable} from '@nestjs/common'
import {InfotravelService} from '../../infotravel.service'

@Injectable()
export class InfrotavelPackageService {
  private readonly basePath = '/package'
  constructor(
    @Inject(forwardRef(() => InfotravelService))
    private readonly infotravelService: InfotravelService,
  ) {}

  async getPackageById(id: string) {
    return await this.infotravelService.get(`${this.basePath}/${id}`)
  }
}
