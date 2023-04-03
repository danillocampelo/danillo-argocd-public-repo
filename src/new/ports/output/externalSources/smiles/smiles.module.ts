import {HttpModule} from '@nestjs/axios'
import {Module} from '@nestjs/common'
import {SmilesService} from './smiles.user.service'

@Module({
  imports: [
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 3,
    }),
  ],
  providers: [SmilesService],
  exports: [SmilesService],
})
export class SmilesModule {}
