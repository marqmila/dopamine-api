import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindAllParameters, SerieDto } from './serie.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class SerieService {
  private series: SerieDto[] = [];

  create(serie: SerieDto) {
    serie.id = uuid();
    this.series.push(serie);
  }

  findById(id: string): SerieDto {
    const foundSerie = this.series.filter((s) => s.id === id);

    if (foundSerie.length) {
      return foundSerie[0];
    }

    throw new HttpException(
      `Serie with id ${id} not found.`,
      HttpStatus.NOT_FOUND,
    );
  }

  findAll(params: FindAllParameters): SerieDto[] {
    return this.series.filter((s) => {
      let match = true;

      if (params.title != undefined && !s.title.includes(params.title)) {
        match = false;
      }

      if (params.who != undefined && !s.who.includes(params.who)) {
        match = false;
      }

      return match;
    });
  }

  update(serie: SerieDto) {
    const serieIndex = this.series.findIndex((s) => s.id === serie.id);

    if (serieIndex >= 0) {
      this.series[serieIndex] = serie;
      return;
    }

    throw new HttpException(
      `Serie with id ${serie.id} not found.`,
      HttpStatus.BAD_REQUEST,
    );
  }

  remove(id: string) {
    const serieIndex = this.series.findIndex((s) => s.id === id);

    if (serieIndex >= 0) {
      this.series.splice(serieIndex, 1);
      return;
    }

    throw new HttpException(
      `Serie with id ${id} not found.`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
