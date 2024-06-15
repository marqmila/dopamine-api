export class UserDto {
  id: string;
  username: string;
  password: string;
}

export interface FindAllParameters {
  username: string;
}
