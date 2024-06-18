import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserResponse, FindAllParameters, UserDto } from './user.dto';
import { v4 as uuid } from 'uuid';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { FindOptionsWhere, ILike, Like, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(newUser: UserDto): Promise<CreateUserResponse> {
    const userAlreadyRegistered = await this.findByUsername(newUser.username);

    if (userAlreadyRegistered) {
      throw new ConflictException(
        `User '${newUser.username}' already registered.`,
      );
    }

    const dbUser = new UserEntity();
    dbUser.username = newUser.username;
    dbUser.passwordHash = bcryptHashSync(newUser.password, 10);

    const { id, username } = await this.usersRepository.save(dbUser);

    return { id, username };
  }

  async findById(id: string): Promise<UserDto | null> {
    const foundUser = await this.usersRepository.findOne({ where: { id } });

    if (!foundUser) {
      throw new HttpException(
        `User with id ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.mapEntityToDto(foundUser);
  }

  async findByUsername(username: string): Promise<UserDto | null> {
    const userFound = await this.usersRepository.findOne({
      where: { username },
    });

    if (!userFound) {
      return null;
    }

    return {
      id: userFound.id,
      username: userFound.username,
      password: userFound.passwordHash,
    };
  }

  async findAll(params: FindAllParameters): Promise<UserDto[]> {
    const searchParams: FindOptionsWhere<UserEntity> = {};
    if (params.username) {
      searchParams.username = Like(`%${params.username}%`);
    }

    const usersFound = await this.usersRepository.find({
      where: searchParams,
    });

    return usersFound.map((userEntity) => this.mapEntityToDto(userEntity));
  }

  async update(id: string, user: UserDto) {
    const userFound = await this.usersRepository.findOne({ where: { id } });

    if (!userFound) {
      throw new HttpException(
        `User with id ${user.id} not found.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.usersRepository.update(id, this.mapDtoToEntity(user));
  }

  async remove(id: string) {
    const result = await this.usersRepository.delete(id);

    if (!result.affected) {
      throw new HttpException(
        `User with id ${id} not found.`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private mapEntityToDto(userEntity: UserEntity): UserDto {
    return {
      id: userEntity.id,
      username: userEntity.username,
      password: userEntity.passwordHash,
    };
  }

  private mapDtoToEntity(userDto: UserDto): Partial<UserEntity> {
    return {
      id: userDto.id,
      username: userDto.username,
      passwordHash: userDto.password,
    };
  }
}
