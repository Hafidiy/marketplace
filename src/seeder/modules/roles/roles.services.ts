import { Injectable } from '@nestjs/common';
import { IRole } from 'src/modules/role/models/role.interface';
import { RoleService } from 'src/modules/role/role.service';
import { initialRoles } from 'src/seeder/data/roles';

@Injectable()
export class RoleSeederService {
  constructor(private roleService: RoleService) {}

  async create(): Promise<IRole[]> {
    const roles: IRole[] = [];

    for (let i = 0; i < initialRoles.length; i++) {
      // console.log('name: ', initialRoles[i].name);
      try {
        const { role } = await this.roleService.createRole(initialRoles[i]);

        // console.log('role: ', role);
        roles.push(role);
      } catch (err) {
        console.log('Error role service', err);
        Promise.reject(err);
      }
    }

    // console.log('roles: ', roles);
    return roles;
  }
}
