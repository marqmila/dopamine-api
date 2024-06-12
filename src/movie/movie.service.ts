import { Injectable } from '@nestjs/common';

@Injectable()
export class MovieService {

  private movies: MovieService[] = [];

  create(movie: MovieService) {
    this.movies.push(movie);
    console.log(this.movies);

  }
}