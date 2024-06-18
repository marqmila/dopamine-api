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
import { MovieService } from './movie.service';
import { FindAllParameters, MovieDto, MovieRouteParameters } from './movie.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  create(@Body() movie: MovieDto) {
    this.movieService.create(movie);
  }

  @Get('/:id')
  async findById(@Param('id') id: string): Promise<MovieDto> {
    return this.movieService.findById(id);
  }

  @Get()
  async findAll(@Query() params: FindAllParameters): Promise<MovieDto[]> {
    return this.movieService.findAll(params);
  }

  @Put('/:id')
  async update(@Param() params: MovieRouteParameters, @Body() movie: MovieDto) {
    this.movieService.update(params.id, movie);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.movieService.remove(id);
  }
}
