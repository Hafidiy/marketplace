import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export let defaultObject: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'marketplace',
    synchronize: true,
    autoLoadEntities: true,
}

export const typeOrmConfig: TypeOrmModuleOptions = {
    ...defaultObject,
    // entities: [__dirname + '/../**/*.entity.js'],
};

export const typeOrmConfigSeeder: TypeOrmModuleOptions = {
    ...defaultObject,
    // entities: [
    //     'dist/**/*.entity.ts',
    //     'dist/**/*.entity.js',
    //     'src/**/*.entity.ts',
    //     'src/**/*.entity.js',
    // ],
}