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

export enum SerieWhoEnum {
  ME = 'ME',
  US = 'US',
}

export class SerieDto {
  // @IsUUID()
  // @IsOptional()
  id: string;

  // @IsString()
  // @MinLength(3)
  // @MaxLength(256)
  title: string;

  // @IsNumber()
  season: number;

  // @IsEnum(SerieWhoEnum)
  who: string;

  // @IsDateString()
  finishedDate: Date;
}

export interface FindAllParameters {
  title: string;
  who: string;
}
