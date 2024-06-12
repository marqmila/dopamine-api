import { Injectable } from '@nestjs/common';
import { SerieDto } from './serie.dto';

@Injectable()
export class SerieService {

  private series: SerieDto[] = [];

  create(serie: SerieDto) {
    this.series.push(serie);
    console.log(this.series);
  }
}
