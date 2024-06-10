import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
  private users: UserDto[] = [];

  create(user: UserDto) {
    this.users.push(user);
    console.log(this.users);
  }
}
