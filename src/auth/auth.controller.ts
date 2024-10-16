import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { User } from 'src/entity/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto'; 
import { LoginUserDto } from 'src/user/dto/login.dto'; 
import { UsersService } from 'src/user/user.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly usersService: UsersService) {}

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
            return await this.usersService.register(createUserDto);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Post('login')
    @ApiOperation({ summary: 'Log in an existing user' })
    @ApiResponse({
        status: 200,
        description: 'User logged in successfully.',
        type: User,
    })
    @ApiResponse({
        status: 400,
        description: 'Invalid email or password.',
        schema: {
            example: {
                message: 'Invalid credentials.',
                error: 'Bad Request',
                statusCode: 400,
            },
        },
    })
    async login(@Body() loginUserDto: LoginUserDto): Promise<{ token: string }> {
        try {
            const user = await this.usersService.login(loginUserDto);
            const token = this.generateStaticToken(user); // Assuming a function to generate a token
            return { token }; // Return the token instead of the user
        } catch (error) {
            throw new BadRequestException('Invalid credentials.');
        }
    }

    private generateStaticToken(user: User): string {
        // Placeholder for token generation logic (e.g., JWT)
        return 'static-token'; // Replace with actual token generation logic
    }
}
