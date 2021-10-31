import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleDto } from './models/role.dto';
import { RoleEntity } from './models/role.entity';
import { IRole } from './models/role.interface';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async getRoles(): Promise<{ roles: IRole[] }> {
    const roles = await this.roleRepository.find({
      relations: ['permissions'],
    });

    return { roles };
  }

  async createRole(data: RoleDto): Promise<{ role: IRole }> {
    const { name, permissions } = data;

    const role = await this.roleRepository.save({
      name,
      permissions: permissions.map((id) => ({ id })),
    });

    return { role };
  }

  async getRole(condition): Promise<{ role: IRole }> {
    const role = await this.roleRepository.findOne(condition, {
      relations: ['permissions'],
    });

    if (!role) {
      throw new NotFoundException();
    }

    return { role };
  }

  async deleteRole(id: number): Promise<void> {
    const result = await this.roleRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }

  async updateRole(id: number, data: RoleDto): Promise<{ role: IRole }> {
    const { name, permissions } = data;

    const { role } = await this.getRole({ id });

    const updatedRole = await this.roleRepository.save({
      ...role,
      name,
      permissions: permissions.map((id) => ({ id })),
    });

    return { role: updatedRole };
  }
}
