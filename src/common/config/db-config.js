const { DataSource } = require('typeorm');
const config = require('./config');

const   dataSource = new DataSource({
  type: 'postgres',
  host: config.typeorm.host,
  port: config.typeorm.port,
  username: config.typeorm.username,
  password: config.typeorm.password,
  database: config.typeorm.database,
  synchronize: true,
  logging: false,
  migrationsRun: true,
  ssl: true,
 
  entities: [
    'src/api/**/model/*.model.js',
  ],
  migrations: ['src/migrations/*{.ts,.js}'],
},
);
exports.dataSource = dataSource;
