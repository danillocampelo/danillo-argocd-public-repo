import {IsNotEmpty, IsString} from 'class-validator'

export class DocumentDto {
  @IsString()
  @IsNotEmpty()
  document: string

  @IsString()
  @IsNotEmpty()
  type: string
}
