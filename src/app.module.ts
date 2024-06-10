import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { MovieModule } from './movie/movie.module';
import { SerieModule } from './serie/serie.module';

@Module({
  imports: [UserModule, BookModule, MovieModule, SerieModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
