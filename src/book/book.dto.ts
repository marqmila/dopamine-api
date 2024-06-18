import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export enum TypeOfBookEnum {
  BOOK = 'BOOK',
  MANGA = 'MANGA',
  COMIC = 'COMIC',
}

export enum BookFormatEnum {
  DIGITAL = 'DIGITAL',
  PHYSICAL = 'PHYSICAL',
}

export class BookDto {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsString()
  @MinLength(3)
  @MaxLength(256)
  title: string;

  @IsString()
  @MinLength(3)
  @MaxLength(256)
  author: string;

  @IsNumber()
  numberOfPages: number;

  @IsEnum(TypeOfBookEnum)
  typeOfBook: string;

  @IsEnum(BookFormatEnum)
  bookFormat: string;

  @IsBoolean()
  @IsOptional()
  purchase: boolean;

  @IsDateString()
  @IsOptional()
  finishedDate: Date;
}

export interface FindAllParameters {
  title: string;
  author: string;
  typeOfBook: string;
  bookFormat: string;
  purchase: boolean;
  finishedDate: Date;
}

export class BookRouteParameters {
  @IsUUID()
  id: string;
}
