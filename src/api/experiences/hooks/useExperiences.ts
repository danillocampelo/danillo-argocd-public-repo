import { Experience } from '@models/Experience'
import { UseQueryOptions } from 'react-query'
import { QueryKeys } from 'src/utils/constants/queryKeys'
import useBaseQuery from '../../../hooks/_common/useBaseQuery'
import { getExperiences } from '../ExperienceServiceApi'

type UseExperiencesInput = {
  queryOptions?: UseQueryOptions<Experience[]>
}

const useExperiences = ({ queryOptions }: UseExperiencesInput) =>
  useBaseQuery<Experience[]>(
    [QueryKeys.experiences],
    () => getExperiences(),
    queryOptions,
  )

export default useExperiences
