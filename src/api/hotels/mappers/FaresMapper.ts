import { Fare } from '../../../models/Fare'
import { FareDto } from '../dtos/FareDto'

export const mapFare = (dto: FareDto): Fare => ({
  type: dto.type,
  price: {
    amount: dto.price.amount,
    currency: dto.price.currency,
  },
})
