import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { BookDto, FindAllParameters } from './book.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  create(@Body() book: BookDto) {
    this.bookService.create(book);
  }

  @Get('/:id')
  findById(@Param('id') id: string): BookDto {
    return this.bookService.findById(id);
  }

  @Get()
  findAll(@Query() params: FindAllParameters): BookDto[] {
    return this.bookService.findAll(params);
  }

  @Put()
  update(@Body() serie: BookDto) {
    this.bookService.update(serie);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(id);
  }
}
