import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { FindAllParameters, MovieDto } from './movie.dto';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  create(@Body() movie: MovieDto) {
    this.movieService.create(movie);
  }

  @Get('/:id')
  findById(@Param('id') id: string): MovieDto {
    return this.movieService.findById(id);
  }

  @Get()
  findAll(@Query() params: FindAllParameters): MovieDto[] {
    return this.movieService.findAll(params);
  }

  @Put()
  update(@Body() serie: MovieDto) {
    this.movieService.update(serie);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.movieService.remove(id);
  }
}
