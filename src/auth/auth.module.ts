import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/user/user.service';
import { User } from 'src/entity/user.entity';
import { UserModule } from 'src/user/user.module'; // Import UserModule

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Ensure this is present
    UserModule, // Import UserModule here
  ],
  controllers: [AuthController],
  providers: [UsersService],
})
export class AuthModule {}
