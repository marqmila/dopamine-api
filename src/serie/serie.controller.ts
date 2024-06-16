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
import { FindAllParameters, SerieDto } from './serie.dto';
import { SerieService } from './serie.service';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('serie')
export class SerieController {
  constructor(private readonly serieService: SerieService) {}

  @Post()
  create(@Body() user: SerieDto) {
    this.serieService.create(user);
  }

  @Get('/:id')
  findById(@Param('id') id: string): SerieDto {
    return this.serieService.findById(id);
  }

  @Get()
  findAll(@Query() params: FindAllParameters): SerieDto[] {
    return this.serieService.findAll(params);
  }

  @Put()
  update(@Body() serie: SerieDto) {
    this.serieService.update(serie);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.serieService.remove(id);
  }
}
