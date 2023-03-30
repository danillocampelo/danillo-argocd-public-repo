import usePackageAvailabilityHook from '@api/availability/hooks/usePackageAvailability'
import useOrigins from '@api/origins/hooks/useOrigins'
import useDebounce from '@hooks/useDebounce'

export const usePackageAvailability = (
  packageId?: string,
  formData?: any,
  onMissingAvailability?: any,
) => {
  const shouldQueryOrigin = Boolean(formData.getOriginQuery())

  const { data: origins } = useOrigins({
    query: formData.getOriginQuery(),
    queryOptions: {
      keepPreviousData: true,
      enabled: shouldQueryOrigin,
    },
  })

  const selectedOrigin = origins?.find(
    ({ id }) => id.toString() === formData.getOriginId(),
  )

  const selectedDates = {
    departure: formData.getDepartureDate(),
    return: formData.getReturnDate(),
  }

  const selectedRoomQuantities = useDebounce(formData.getRoomsQuantities(), 350)

  const shouldQueryAvailability = Boolean(
    selectedDates && selectedOrigin && selectedRoomQuantities,
  )

  const { data: packageAvailability, isLoading: searchingAvailability } =
    usePackageAvailabilityHook({
      input: {
        packageId: packageId || '',
        origin: selectedOrigin,
        roomQuantities: selectedRoomQuantities || [],
        departureDate: selectedDates?.departure,
        returnDate: selectedDates?.return,
      },
      queryOptions: {
        enabled: shouldQueryAvailability,
        onError: onMissingAvailability,
        cacheTime: 5 * 60 * 1000,
        staleTime: 5 * 60 * 1000,
      },
    })

  return { packageAvailability, searchingAvailability }
}
