import * as path from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const options: TypeOrmModuleOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "vinhos",
  entities: [
    path.resolve(__dirname, '..', 'db', 'models', '*')
  ],
  migrations: [
    path.resolve(__dirname, '..', 'db', 'migrations', '*')
  ],
  synchronize: true,
};

module.exports = options;