import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export enum SerieStatusEnum {
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

  @IsNumber()
  season: number;

  @IsEnum(SerieStatusEnum)
  status: string;

  @IsDateString()
  finishedDate: Date;
}
