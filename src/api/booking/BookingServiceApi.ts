import { post } from '@api/_common/api'
import { CheckRateInputDto } from './dtos/CheckRateInputDto'
import { CheckRateResponseDto } from './dtos/CheckRateResponseDto'

async function checkRate(input: CheckRateInputDto) {
  const { data } = await post<CheckRateResponseDto>({
    url: `checkout/checkRate`,
    params: input,
  })
  return data
}

export { checkRate }
