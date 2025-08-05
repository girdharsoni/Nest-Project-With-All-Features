import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

// Import modules
import { UsersModule } from './modules/users/users.module';
import { ReportsModule } from './modules/reports/reports.module';
import { LoginOtpModule } from './modules/login-otp/login-otp.module';

type DBType = 'postgres' | 'mariadb' | 'mongodb' | 'sqlite';
const entitiesPath =
  '/entities/*.entity' +
  (process.env.NODE_ENV === 'production' ? '.js' : '.ts'); // '/../**/*.entity' can be used to load all entities
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        `.env.${process.env.NODE_ENV}`, // picks .env.production or .env.development
        '.env', // fallback
      ],
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as DBType,
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + entitiesPath],
      // Use the entitiesPath variable if you want to specify entities directly
      // [User, LoginOtp, Role, Permission, RolePermission, Report]; (uncomment if you want to specify entities directly)
      synchronize: true,
      autoLoadEntities: false,
      // logging: true,
    }),
    UsersModule,
    ReportsModule,
    LoginOtpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
