import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postgresConfig } from '../type-orm.config';

@Module({
  imports: [UsersModule, TypeOrmModule.forRoot(postgresConfig)],
})
export class AppModule {}
