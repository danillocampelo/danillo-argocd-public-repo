import useBaseQuery from './_common/useBaseQuery'
import { getHotels } from '@api/hotels/HotelServiceApi'

const useHotels = () => useBaseQuery('hotels', () => getHotels())

export default useHotels
