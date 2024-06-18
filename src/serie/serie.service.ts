import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindAllParameters, SerieDto, SerieWhoEnum } from './serie.dto';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { SerieEntity } from 'src/database/entities/serie.entity';
import { FindOptionsWhere, Repository, Like } from 'typeorm';

@Injectable()
export class SerieService {
  constructor(
    @InjectRepository(SerieEntity)
    private readonly serieRepository: Repository<SerieEntity>,
  ) {}

  async create(serie: SerieDto) {
    const serieToSave: SerieEntity = {
      title: serie.title,
      season: serie.season,
      who: serie.who,
      finishedDate: serie.finishedDate,
    };

    const createdSerie = await this.serieRepository.save(serieToSave);

    return this.mapEntityToDto(createdSerie);
  }

  async findById(id: string): Promise<SerieDto> {
    const foundSerie = await this.serieRepository.findOne({ where: { id } });

    if (!foundSerie) {
      throw new HttpException(
        `Serie with id ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.mapEntityToDto(foundSerie);
  }

  async findAll(params: FindAllParameters): Promise<SerieDto[]> {
    const searchParams: FindOptionsWhere<SerieEntity> = {};
    if (params.title) {
      searchParams.title = Like(`%${params.title}%`);
    }

    if (params.who) {
      searchParams.who = Like(`%${params.who}%`);
    }

    const seriesFound = await this.serieRepository.find({
      where: searchParams,
    });

    return seriesFound.map((serieEntity) => this.mapEntityToDto(serieEntity));
  }

  async update(id: string, serie: SerieDto) {
    const foundSerie = await this.serieRepository.findOne({ where: { id } });

    if (!foundSerie) {
      throw new HttpException(
        `Serie with id ${serie.id} not found.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.serieRepository.update(id, this.mapDtoToEntity(serie));
  }

  async remove(id: string) {
    const result = await this.serieRepository.delete(id);

    if (!result.affected) {
      throw new HttpException(
        `Serie with id ${id} not found.`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private mapEntityToDto(serieEntity: SerieEntity): SerieDto {
    return {
      id: serieEntity.id,
      title: serieEntity.title,
      season: serieEntity.season,
      who: SerieWhoEnum[serieEntity.who],
      finishedDate: serieEntity.finishedDate,
    };
  }

  private mapDtoToEntity(serieDto: SerieDto): Partial<SerieEntity> {
    return {
      id: serieDto.id,
      title: serieDto.title,
      season: serieDto.season,
      who: serieDto.who.toString(),
      finishedDate: serieDto.finishedDate,
    };
  }
}
