import {ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty, IsOptional, IsString, MaxLength} from 'class-validator'

export class ExperienceDto {
  @IsString()
  @MaxLength(150)
  @IsNotEmpty()
  @ApiProperty()
  name: string

  @IsString()
  @MaxLength(255)
  @IsOptional()
  @ApiProperty({required: false})
  description?: string
}
