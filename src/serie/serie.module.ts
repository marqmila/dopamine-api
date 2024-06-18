import { Module } from '@nestjs/common';
import { SerieService } from './serie.service';
import { SerieController } from './serie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SerieEntity } from 'src/database/entities/serie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SerieEntity])],
  controllers: [SerieController],
  providers: [SerieService],
})
export class SerieModule {}
