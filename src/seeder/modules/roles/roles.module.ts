import { Module } from "@nestjs/common";
import { RoleModule } from "src/modules/role/role.module";
import { RoleSeederService } from "./roles.services";

@Module({
    imports: [RoleModule],
    providers: [RoleSeederService],
    exports: [RoleSeederService],
  })
  export class RoleSeederModule {}
  