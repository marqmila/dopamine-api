import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export enum MovieWhoEnum {
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

  @IsEnum(MovieWhoEnum)
  who: string;

  @IsDateString()
  finishedDate: Date;
}
