import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindAllParameters, UserDto } from './user.dto';

@Injectable()
export class UserService {
  private users: UserDto[] = [];

  create(user: UserDto) {
    this.users.push(user);
    console.log(this.users);
  }

  findById(id: string): UserDto {
    const foundUser = this.users.filter((u) => u.id === id);

    if (foundUser.length) {
      return foundUser[0];
    }

    throw new HttpException(
      `User with id ${id} not found.`,
      HttpStatus.NOT_FOUND,
    );
  }

  findAll(params: FindAllParameters): UserDto[] {
    return this.users.filter((u) => {
      let match = true;

      if (
        params.username != undefined &&
        !u.username.includes(params.username)
      ) {
        match = false;
      }

      return match;
    });
  }

  update(user: UserDto) {
    const userIndex = this.users.findIndex((u) => u.id === user.id);

    if (userIndex >= 0) {
      this.users[userIndex] = user;
      return;
    }

    throw new HttpException(
      `User with id ${user.id} not found.`,
      HttpStatus.BAD_REQUEST,
    );
  }

  remove(id: string) {
    const userIndex = this.users.findIndex((u) => u.id === id);

    if (userIndex >= 0) {
      this.users.splice(userIndex, 1);
      return;
    }

    throw new HttpException(
      `User with id ${id} not found.`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
