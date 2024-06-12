import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {

  private users: UserDto[] = [];
  
  create(user: UserDto) {
    this.users.push(user);
    console.log(this.users);
  }

  findById(id: string): UserDto {
    const foundUser = this.users.filter(t => t.id === id);

    if (foundUser.length) {
      return foundUser[0];
    }

    throw new NotFoundException(`User with id ${id} not found.`);
  }

  // findAll() {
  //   throw new Error('Method not implemented.');
  // }

  // update(arg0: number, updateUserDto: UserDto) {
  //   throw new Error('Method not implemented.');
  // }

  // remove(arg0: number) {
  //   throw new Error('Method not implemented.');
  // }

}
