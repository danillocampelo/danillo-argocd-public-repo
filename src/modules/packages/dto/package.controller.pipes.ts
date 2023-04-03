import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common'

const experiences = ['Aventure-se']

@Injectable()
export class ValidateExperiences implements PipeTransform<string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    if (experiences.includes(value)) return value
    throw new BadRequestException(
      `${value} invalido, valid options: ${experiences}`,
    )
  }
}
