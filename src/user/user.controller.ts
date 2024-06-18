import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserResponse,
  FindAllParameters,
  UserDto,
  UserRouteParameters,
} from './user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() user: UserDto): Promise<CreateUserResponse> {
    return await this.userService.create(user);
  }

  @Get('/:id')
  findById(@Param('id') id: string): Promise<UserDto> {
    return this.userService.findById(id);
  }

  @Get()
  findAll(@Query() params: FindAllParameters): Promise<UserDto[]> {
    return this.userService.findAll(params);
  }

  @Put('/:id')
  update(@Param() params: UserRouteParameters, @Body() user: UserDto) {
    this.userService.update(params.id, user);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
