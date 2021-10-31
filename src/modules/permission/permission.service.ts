import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryDto } from '../common/models/query.dto';
import { PermissionDto } from './models/permission.dto';
import { PermissionEntity } from './models/permission.entity';
import { IPermission, IPermissionPaginated } from './models/permissions.interface';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly permissionRepository: Repository<PermissionEntity>,
  ) {}

  async getPermissions(query?: QueryDto): Promise<IPermissionPaginated> {
    let { page, count } = query || {};

    if(page && typeof page === 'string'){
      page = parseInt(page);
    }

    if(count && typeof count === 'string'){
      count = parseInt(count)
    }

    page = page && page > 1 ? page : 1;
    count = count && count > 1 ? count : 10;

    const [permissions, total] = await this.permissionRepository.findAndCount({
      take: count,
      skip: (page - 1) * count,
    });

    return { permissions, meta: {
      total,
      page,
      last_page: Math.ceil(total / count)
    } };
  }

  async createPermission(
    data: PermissionDto,
  ): Promise<{ permission: IPermission }> {
    const { name } = data;

    try {
      const newPermission = await this.permissionRepository.save({ name });
      return { permission: newPermission };
    } catch (err) {
      console.log('err: ', err);
      if (err.code === '23505') {
        throw new ConflictException('Permission already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getPermission(condition): Promise<{ permission: IPermission }> {
    const permission = await this.permissionRepository.findOne(condition);

    if(!permission){
        throw new NotFoundException();
    }

    return { permission };
  }

  async deletePermission(id: number): Promise<void> {
    const result = await this.permissionRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }

  async updatePermission(
    id: number,
    data: PermissionDto,
  ): Promise<{ permission: IPermission }> {
    const { name } = data;

    const { permission } = await this.getPermission({ id });

    try {
      const updatedPermission = await this.permissionRepository.save({
        ...permission,
        name,
      });

      return { permission: updatedPermission };
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Permission already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
