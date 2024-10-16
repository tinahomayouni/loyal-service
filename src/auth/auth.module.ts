import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/user/user.service';
import { User } from 'src/entity/user.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [UsersService],
})
export class AuthModule {}
