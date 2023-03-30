enum MappedFacilityIds {
  DEFAULT = 0,
  WI_FI = 2390,
}

enum IconNames {
  WI_FI = 'wifi',
  DEFAULT = 'check',
}

const roomIconsMap = new Map<MappedFacilityIds | number, IconNames>()

roomIconsMap.set(MappedFacilityIds.DEFAULT, IconNames.DEFAULT)
roomIconsMap.set(MappedFacilityIds.WI_FI, IconNames.WI_FI)

//TODO: Make this guy a generic getMetainfoIcon
export const getFacilityIcon = (facilityId: MappedFacilityIds | number) => {
  return (
    roomIconsMap.get(facilityId) || roomIconsMap.get(MappedFacilityIds.DEFAULT)
  )
}
