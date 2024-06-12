import { Body, Controller, Post } from '@nestjs/common';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}


  @Post()
  create(@Body() book: BookService) {
    this.bookService.create(book);
  }
  
}
