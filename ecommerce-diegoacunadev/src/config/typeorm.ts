import { config as dotenvConfig } from 'dotenv';
import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.development.env' });

const config = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dropSchema: false,
  synchronize: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
};

export default registerAs('typeorm', () => config);

export const connectionSource = new DataSource(config as DataSourceOptions); //solo se ejecuta en las migraciones
