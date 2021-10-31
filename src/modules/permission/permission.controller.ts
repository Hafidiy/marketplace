import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { QueryDto } from '../common/models/query.dto';
import { PermissionDto } from './models/permission.dto';
import { PermissionService } from './permission.service';

@Controller('api/permissions')
export class PermissionController {
    constructor(
        private permissionService: PermissionService
    ) {}

    @Get()
    async getPermissions(
        @Query() queryDto: QueryDto
    ) {
        return this.permissionService.getPermissions(queryDto);
    }

    @Post()
    async createPermission(
        @Body() body: PermissionDto,
    ) {
        return this.permissionService.createPermission(body);
    }

    @Get(':id')
    async getPermission(
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.permissionService.getPermission(id);
    }

    @Delete(':id')
    async deletePermission(
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.permissionService.deletePermission(id);
    }

    @Put(':id')
    async updatePermission(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: PermissionDto
    ) {
        return this.permissionService.updatePermission(id, body);
    }
}
