import { Body, Controller, Post } from '@nestjs/common';
import { SerieService } from './serie.service';
import { SerieDto } from './serie.dto';

@Controller('serie')
export class SerieController {
  constructor(private readonly serieService: SerieService) {}

  @Post()
  create(@Body() user: SerieDto) {
    this.serieService.create(user);
  }

}
