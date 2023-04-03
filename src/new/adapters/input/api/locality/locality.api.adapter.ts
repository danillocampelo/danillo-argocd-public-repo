import {Injectable} from '@nestjs/common'
import {Locality} from '../../../../core/locality/models/locality'
import {LocationSearchOutput} from '../../../../ports/input/api/locality/dto/location.search.dto'

@Injectable()
export class LocalityApiAdapter {
  public toLocalityOutputFromLocality(input: Locality): LocationSearchOutput {
    const output = new LocationSearchOutput()
    output.id = Number(input.externalId)
    output.name = input.name

    return output
  }
}
