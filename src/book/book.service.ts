import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BookDto, FindAllParameters } from './book.dto';

@Injectable()
export class BookService {
  private books: BookDto[] = [];

  create(book: BookDto) {
    this.books.push(book);
  }

  findById(id: string): BookDto {
    const foundBook = this.books.filter((b) => b.id === id);

    if (foundBook.length) {
      return foundBook[0];
    }

    throw new HttpException(
      `Book with id ${id} not found.`,
      HttpStatus.NOT_FOUND,
    );
  }

  findAll(params: FindAllParameters): BookDto[] {
    return this.books.filter((b) => {
      let match = true;

      if (params.title != undefined && !b.title.includes(params.title)) {
        match = false;
      }

      if (params.author != undefined && !b.author.includes(params.author)) {
        match = false;
      }

      if (
        params.typeOfBook != undefined &&
        !b.typeOfBook.includes(params.typeOfBook)
      ) {
        match = false;
      }

      if (
        params.bookFormat != undefined &&
        !b.bookFormat.includes(params.bookFormat)
      ) {
        match = false;
      }

      // Need to find a way to "find" with parameters purchase(boolean) and finishedDate(Date)

      return match;
    });
  }

  update(book: BookDto) {
    const bookIndex = this.books.findIndex((m) => m.id === book.id);

    if (bookIndex >= 0) {
      this.books[bookIndex] = book;
      return;
    }

    throw new HttpException(
      `Book with id ${book.id} not found.`,
      HttpStatus.BAD_REQUEST,
    );
  }

  remove(id: string) {
    const bookIndex = this.books.findIndex((m) => m.id === id);

    if (bookIndex >= 0) {
      this.books.splice(bookIndex, 1);
      return;
    }

    throw new HttpException(
      `Book with id ${id} not found.`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
