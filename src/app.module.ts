import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UserRankModule } from './UserRank/UserRank.module';


@Module({
  imports: [
  ConfigModule.forRoot({ isGlobal: true }),
  DatabaseModule,
  UserModule,
  AuthModule,
  UserRankModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
