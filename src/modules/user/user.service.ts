import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCreateDto } from './models/user-create.dto';
import {
  UserUpdateInfoDto,
  UserUpdatePasswordDto,
} from './models/user-update.dto';
import { UserEntity } from './models/user.entity';
import { IUser, IUserPaginated } from './models/user.interface';
import * as bcrypt from 'bcrypt';
import { QueryDto } from '../common/models/query.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUsers(query?: QueryDto): Promise<IUserPaginated> {
    let { page } = query || {};

    if(page && typeof page === 'string'){
      page = parseInt(page);
    }

    const take = 10;
    page = page && page > 1 ? page : 1;

    const [users, total] = await this.userRepository.findAndCount({
      take,
      skip: (page - 1) * take,
      relations: ['role']
    });

    return { users, meta: {
      total,
      page,
      last_page: Math.ceil(total / take)
    } };
  }

  async createUser(data: UserCreateDto): Promise<{ user: IUser }> {
    const { username, first_name, last_name, password, role_id } = data;

    let user: any = {}
    let userSalt = await bcrypt.genSalt();
    let userPassword = await bcrypt.hash(password || '1234', userSalt);

    try {
      user = await this.userRepository.save({
        username,
        first_name,
        last_name,
        salt: userSalt,
        password: userPassword,
        role: {id: role_id || 3}
      })
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }

    delete user.salt;
    delete user.password;

    return { user };
  }

  async getUser(condition): Promise<{ user: IUser }> {
    const user = await this.userRepository.findOne(condition);

    if (!user) {
      throw new NotFoundException();
    }

    return { user };
  }

  async deleteUser(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
  }

  async updateUserInfo(
    id: number,
    userUpdateDto: UserUpdateInfoDto,
  ): Promise<{ user: IUser }> {
    const { username, first_name, last_name } = userUpdateDto;

    const { user } = await this.getUser({id});

    user.username = username;
    user.first_name = first_name;
    user.last_name = last_name;

    try {
      await this.userRepository.save(user);
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }

    return { user };
  }

  async updateUserPassword(
    id: number,
    userUpdateDto: UserUpdatePasswordDto,
  ): Promise<void> {
    const { password, new_password } = userUpdateDto;

    console.log('id: ', id);
    console.log('password: ', password);
    console.log('new_password: ', new_password);
  }
}
