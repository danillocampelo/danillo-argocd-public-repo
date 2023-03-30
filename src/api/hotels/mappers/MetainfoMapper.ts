import { Metainfo } from '../../../models/Metainfo'
import { FacilityDto } from '../dtos/FacilityDto'

export const mapMetainfoFromFacilities = (dto: FacilityDto): Metainfo => ({
  title: dto.title,
  icon: {
    id: dto.id,
  },
})
