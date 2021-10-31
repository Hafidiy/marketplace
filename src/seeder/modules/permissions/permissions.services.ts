import { Injectable } from '@nestjs/common';
import { IPermission } from 'src/modules/permission/models/permissions.interface';
import { initialPermissions } from 'src/seeder/data/permissions';
import { PermissionService } from 'src/modules/permission/permission.service';

@Injectable()
export class PermissionSeederService {
  constructor(private permissionService: PermissionService) {}

  async create(): Promise<IPermission[]> {
    const permissions: IPermission[] = [];

    for (let i = 0; i < initialPermissions.length; i++) {
      // console.log('name: ', initialPermissions[i].name);
      try {
        const { permission } = await this.permissionService.createPermission(
          initialPermissions[i],
        );

        // console.log('permission: ', permission);
        permissions.push(permission);
      } catch (err) {
        console.log('Error permission service', err);
        Promise.reject(err);
      }
    }

    // console.log('permissions: ', permissions);
    return permissions;
  }
}
