import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { FindAllParameters, UserDto } from './user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() user: UserDto) {
    console.log(`Usuário criado com sucesso!`);
    this.userService.create(user);
  }

  @Get('/:id')
  findById(@Param('id') id: string): UserDto {
    return this.userService.findById(id);
  }

  @Get()
  findAll(@Query() params: FindAllParameters): UserDto[] {
    return this.userService.findAll(params);
  }

  @Put()
  update(@Body() serie: UserDto) {
    this.userService.update(serie);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
