import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'arjuna.db.elephantsql.com',
  port: 5432,
  username: 'dgqntdlc',
  password: 'pIqDlx_fWRghLt8FA3YwKYnNhxLlK8bL',
  database: 'dgqntdlc',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};

export default config;