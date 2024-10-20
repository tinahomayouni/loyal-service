import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UserRankModule } from './UserRank/UserRank.module';
import { FilesModule } from './files/file.module';
import { NotificationsModule } from './notification/noitification.module';
import { CompanyModule } from './company/company.module';
import { TransactionModule } from './transaction/transaction.module';
import {  RolesModule } from './role/role.module';


@Module({
  imports: [
  ConfigModule.forRoot({ isGlobal: true }),
  DatabaseModule,
  UserModule,
  AuthModule,
  UserRankModule,
  FilesModule,
  NotificationsModule,
  CompanyModule,
  TransactionModule,
  RolesModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
