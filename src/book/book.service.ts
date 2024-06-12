import { Injectable } from '@nestjs/common';

@Injectable()
export class BookService {

  private books: BookService[] = [];

  create(book: BookService) {
    this.books.push(book);
    console.log(this.books);

  }

}
