import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { IRole } from './models/role.interface';
import { RoleDto } from './models/role.dto';

@Controller('api/roles')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get()
  async getRoles(): Promise<{ roles: IRole[] }> {
    return this.roleService.getRoles();
  }

  @Post()
  async createRole(@Body() body: RoleDto): Promise<{ role: IRole }> {
    return this.roleService.createRole(body);
  }

  @Get(':id')
  async getRoleById(@Param('id', ParseIntPipe) id: number): Promise<{ role: IRole }> {
    return this.roleService.getRole(id);
  }
  
  @Delete(':id')
  async deleteRole(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.roleService.deleteRole(id);
  }

  @Put(':id')
  async updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: RoleDto,
  ): Promise<{ role: IRole }> {
    return this.roleService.updateRole(id, body);
  }
}
