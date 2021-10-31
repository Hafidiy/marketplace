import { Module } from "@nestjs/common";
import { PermissionModule } from "src/modules/permission/permission.module";
import { PermissionSeederService } from "./permissions.services";

@Module({
  imports: [PermissionModule],
  providers: [PermissionSeederService],
  exports: [PermissionSeederService],
})
export class PermissionSeederModule {}
