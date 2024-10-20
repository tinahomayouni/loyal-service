import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UserRankModule } from './UserRank/UserRank.module';
import { FilesModule } from './files/file.module';
import { NotificationsModule } from './notification/noitification.module';


@Module({
  imports: [
  ConfigModule.forRoot({ isGlobal: true }),
  DatabaseModule,
  UserModule,
  AuthModule,
  UserRankModule,
  FilesModule,
  NotificationsModule,
  UserModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
