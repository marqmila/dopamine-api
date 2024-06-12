import { Body, Controller, Post } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  create(@Body() movie: MovieService) {
    this.movieService.create(movie);
  }
}
