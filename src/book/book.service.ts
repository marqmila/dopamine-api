import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  BookDto,
  BookFormatEnum,
  FindAllParameters,
  TypeOfBookEnum,
} from './book.dto';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from 'src/database/entities/book.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
  ) {}

  async create(book: BookDto) {
    const bookToSave: BookEntity = {
      title: book.title,
      author: book.author,
      numberOfPages: book.numberOfPages,
      typeOfBook: book.typeOfBook,
      bookFormat: book.bookFormat,
      purchase: book.purchase,
      finishedDate: book.finishedDate,
    };

    const createdBook = await this.bookRepository.save(bookToSave);

    return this.mapEntityToDto(createdBook);
  }

  async findById(id: string): Promise<BookDto> {
    const foundBook = await this.bookRepository.findOne({ where: { id } });

    if (!foundBook) {
      throw new HttpException(
        `Book with id ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.mapEntityToDto(foundBook);
  }

  async findAll(params: FindAllParameters): Promise<BookDto[]> {
    const searchParams: FindOptionsWhere<BookEntity> = {};
    if (params.title) {
      searchParams.title = Like(`%${params.title}%`);
    }

    if (params.author) {
      searchParams.author = Like(`%${params.author}%`);
    }

    if (params.typeOfBook) {
      searchParams.typeOfBook = Like(`%${params.typeOfBook}%`);
    }

    if (params.bookFormat) {
      searchParams.bookFormat = Like(`%${params.bookFormat}%`);
    }

    // Incluir busca pelos parâmetros: purchase e finishedDate

    const booksFound = await this.bookRepository.find({
      where: searchParams,
    });

    return booksFound.map((bookEntity) => this.mapEntityToDto(bookEntity));
  }

  async update(id: string, book: BookDto) {
    const foundBook = await this.bookRepository.findOne({ where: { id } });

    if (!foundBook) {
      throw new HttpException(
        `Book with id ${book.id} not found.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.bookRepository.update(id, this.mapDtoToEntity(book));
  }

  async remove(id: string) {
    const result = await this.bookRepository.delete(id);

    if (!result.affected) {
      throw new HttpException(
        `Book with id ${id} not found.`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private mapEntityToDto(bookEntity: BookEntity): BookDto {
    return {
      id: bookEntity.id,
      title: bookEntity.title,
      author: bookEntity.author,
      numberOfPages: bookEntity.numberOfPages,
      typeOfBook: TypeOfBookEnum[bookEntity.typeOfBook],
      bookFormat: BookFormatEnum[bookEntity.bookFormat],
      purchase: bookEntity.purchase,
      finishedDate: bookEntity.finishedDate,
    };
  }

  private mapDtoToEntity(bookDto: BookDto): Partial<BookEntity> {
    return {
      id: bookDto.id,
      title: bookDto.title,
      author: bookDto.author,
      numberOfPages: bookDto.numberOfPages,
      typeOfBook: TypeOfBookEnum[bookDto.typeOfBook],
      bookFormat: BookFormatEnum[bookDto.bookFormat],
      purchase: bookDto.purchase,
      finishedDate: bookDto.finishedDate,
    };
  }
}
