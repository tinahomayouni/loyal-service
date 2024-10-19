import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { UserService } from './user.service';

@Module({
    imports: [
        ConfigModule, // Ensure ConfigModule is imported
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'default_secret', // Ensure this is set
            signOptions: { expiresIn: '60s' },
        }),
    ],
    providers: [UserService],
    exports: [UserService, TypeOrmModule],
})
export class UserModule {}
