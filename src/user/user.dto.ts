import { IsUUID } from 'class-validator';

export class UserDto {
  id: string;
  username: string;
  password: string;
}

export interface FindAllParameters {
  username: string;
}

export interface CreateUserResponse {
  id: string;
  username;
}

export class UserRouteParameters {
  @IsUUID()
  id: string;
}
