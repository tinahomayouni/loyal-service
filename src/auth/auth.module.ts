import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module'; // Import UserModule here
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthService } from './auth.service';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          //signOptions: { expiresIn: process.env.JWT_EXPIRATION },
        }),
        UserModule],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy], // You may also add other providers here
})
export class AuthModule {}
