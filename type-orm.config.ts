import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const postgresConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'nestjs_jiansen',
  password: 'postgres',
  entities: ['dist/**/*.entity{ .ts,.js}'],
  synchronize: true,
};
