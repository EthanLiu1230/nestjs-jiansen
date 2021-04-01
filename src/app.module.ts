import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postgresConfig } from '../type-orm.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forRoot(postgresConfig), AuthModule],
})
export class AppModule {}
