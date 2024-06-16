import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindAllParameters, MovieDto } from './movie.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class MovieService {
  private movies: MovieDto[] = [];

  create(movie: MovieDto) {
    movie.id = uuid();
    this.movies.push(movie);
  }

  findById(id: string): MovieDto {
    const foundMovie = this.movies.filter((m) => m.id === id);

    if (foundMovie.length) {
      return foundMovie[0];
    }

    throw new HttpException(
      `Movie with id ${id} not found.`,
      HttpStatus.NOT_FOUND,
    );
  }

  findAll(params: FindAllParameters): MovieDto[] {
    return this.movies.filter((m) => {
      let match = true;

      if (params.title != undefined && !m.title.includes(params.title)) {
        match = false;
      }

      if (params.who != undefined && !m.who.includes(params.who)) {
        match = false;
      }

      if (
        params.director != undefined &&
        !m.director.includes(params.director)
      ) {
        match = false;
      }

      return match;
    });
  }

  update(movie: MovieDto) {
    const movieIndex = this.movies.findIndex((m) => m.id === movie.id);

    if (movieIndex >= 0) {
      this.movies[movieIndex] = movie;
      return;
    }

    throw new HttpException(
      `Movie with id ${movie.id} not found.`,
      HttpStatus.BAD_REQUEST,
    );
  }

  remove(id: string) {
    const movieIndex = this.movies.findIndex((m) => m.id === id);

    if (movieIndex >= 0) {
      this.movies.splice(movieIndex, 1);
      return;
    }

    throw new HttpException(
      `Movie with id ${id} not found.`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
