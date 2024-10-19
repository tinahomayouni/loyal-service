import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { User } from 'src/entity/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto'; 
import { LoginUserDto } from 'src/user/dto/login.dto'; 
import { UserService } from 'src/user/user.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly userService: UserService) {}

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

    @Post('login')
    @ApiOperation({ summary: 'Login and get a JWT token' })
    @ApiResponse({ status: 200, description: 'JWT access token' })
    @ApiResponse({ status: 400, description: 'Invalid credentials' })

    async login(@Body() loginUserDto: LoginUserDto): Promise<{ access_token: string }> {

        const user = await this.userService.login(loginUserDto); // This will throw an error if invalid

        // Generate a JWT token
        const access_token = this.userService.generateJwtToken(user);

        return { access_token }; // Return the token on successful login
    }
}
