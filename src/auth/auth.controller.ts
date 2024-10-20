import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { User } from 'src/entity/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto'; 
import { LoginUserDto } from 'src/auth/dto/login.dto'; 
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly userService: AuthService) {}

    @Post('register')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({
        status: 201,
        description: 'User registered successfully.',
        type: User,
    })
    @ApiResponse({
        status: 400,
        description: 'User already exists or validation errors.',
        schema: {
            example: {
                message: [
                    'email should not be empty',
                    'email must be an email',
                    'password must be longer than or equal to 6 characters',
                    'password should not be empty',
                ],
                error: 'Bad Request',
                statusCode: 400,
            },
        },
    })
    async register(@Body() createUserDto: CreateUserDto): Promise<User> {
        try {
            return await this.userService.register(createUserDto);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Post('login')  // Assuming you have a POST /auth/login route
    async login(@Body() loginUserDto: LoginUserDto) {
        return this.userService.login(loginUserDto); // Call the service method
    }
}
