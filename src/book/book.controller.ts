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
import { BookDto, BookRouteParameters, FindAllParameters } from './book.dto';
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
  async findById(@Param('id') id: string): Promise<BookDto> {
    return this.bookService.findById(id);
  }

  @Get()
  async findAll(@Query() params: FindAllParameters): Promise<BookDto[]> {
    return this.bookService.findAll(params);
  }

  @Put('/:id')
  update(@Param() params: BookRouteParameters, @Body() serie: BookDto) {
    this.bookService.update(params.id, serie);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(id);
  }
}
