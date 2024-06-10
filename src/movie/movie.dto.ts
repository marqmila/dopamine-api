import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export enum MovieStatusEnum {
  ME = 'ME',
  US = 'US',
}

export class SerieDto {

  @IsUUID()
  @IsOptional()
  id: string;

  @IsString()
  @MinLength(3)
  @MaxLength(256)
  title: string;

  @IsString()
  @MinLength(5)
  @MaxLength(512)
  director: string;

  @IsEnum(MovieStatusEnum)
  status: string;

  @IsDateString()
  finishedDate: Date;
}
