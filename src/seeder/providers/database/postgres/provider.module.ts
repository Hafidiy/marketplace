import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfigSeeder } from "src/config/typeorm.config";

@Module({
    imports: [
        TypeOrmModule.forRoot(typeOrmConfigSeeder)
    ],
  })
  export class DatabaseProviderModule {}