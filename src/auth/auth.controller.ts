import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { User } from 'src/entity/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto'; 
import { LoginUserDto } from 'src/user/dto/login.dto'; 
import { UsersService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly usersService: UsersService) {}

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto): Promise<User> {
        try {
            return await this.usersService.register(createUserDto);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto): Promise<User> {
        try {
            return await this.usersService.login(loginUserDto);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
