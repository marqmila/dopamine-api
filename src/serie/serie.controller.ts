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
import { FindAllParameters, SerieDto, SerieRouteParameters } from './serie.dto';
import { SerieService } from './serie.service';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('serie')
export class SerieController {
  constructor(private readonly serieService: SerieService) {}

  @Post()
  async create(@Body() user: SerieDto): Promise<SerieDto> {
    return await this.serieService.create(user);
  }

  @Get('/:id')
  async findById(@Param('id') id: string): Promise<SerieDto> {
    return this.serieService.findById(id);
  }

  @Get()
  async findAll(@Query() params: FindAllParameters): Promise<SerieDto[]> {
    return this.serieService.findAll(params);
  }

  @Put('/:id')
  async update(@Param() params: SerieRouteParameters, @Body() serie: SerieDto) {
    await this.serieService.update(params.id, serie);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.serieService.remove(id);
  }
}
