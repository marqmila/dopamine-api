import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindAllParameters, MovieDto, MovieWhoEnum } from './movie.dto';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from 'src/database/entities/movie.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
  ) {}

  async create(movie: MovieDto) {
    const movieToSave: MovieEntity = {
      title: movie.title,
      director: movie.director,
      who: movie.who,
      finishedDate: movie.finishedDate,
    };

    const createdMovie = await this.movieRepository.save(movieToSave);

    return this.mapEntityToDto(createdMovie);
  }

  async findById(id: string): Promise<MovieDto> {
    const foundMovie = await this.movieRepository.findOne({ where: { id } });

    if (!foundMovie) {
      throw new HttpException(
        `Movie with id ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.mapEntityToDto(foundMovie);
  }

  async findAll(params: FindAllParameters): Promise<MovieDto[]> {
    const searchParams: FindOptionsWhere<MovieEntity> = {};
    if (params.title) {
      searchParams.title = Like(`%${params.title}%`);
    }

    if (params.director) {
      searchParams.director = Like(`%${params.director}%`);
    }

    if (params.who) {
      searchParams.who = Like(`%${params.who}%`);
    }

    const moviesFound = await this.movieRepository.find({
      where: searchParams,
    });

    return moviesFound.map((movieEntity) => this.mapEntityToDto(movieEntity));
  }

  async update(id: string, movie: MovieDto) {
    const foundMovie = await this.movieRepository.findOne({ where: { id } });

    if (!foundMovie) {
      throw new HttpException(
        `Movie with id ${movie.id} not found.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.movieRepository.update(id, this.mapDtoToEntity(movie));
  }

  async remove(id: string) {
    const result = await this.movieRepository.delete(id);

    if (!result.affected) {
      throw new HttpException(
        `Movie with id ${id} not found.`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private mapEntityToDto(movieEntity: MovieEntity): MovieDto {
    return {
      id: movieEntity.id,
      title: movieEntity.title,
      director: movieEntity.director,
      who: MovieWhoEnum[movieEntity.who],
      finishedDate: movieEntity.finishedDate,
    };
  }

  private mapDtoToEntity(movieDto: MovieDto): Partial<MovieEntity> {
    return {
      id: movieDto.id,
      title: movieDto.title,
      director: movieDto.director,
      who: movieDto.who.toString(),
      finishedDate: movieDto.finishedDate,
    };
  }
}
