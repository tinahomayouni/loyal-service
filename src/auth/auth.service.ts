import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) {}

    async findById(id: number): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { id } });
    }

    async register(createUserDto: RegisterUserDto): Promise<User> {
        const { email, password , role } = createUserDto;

        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new BadRequestException('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({ email, password: hashedPassword , role });
        return this.userRepository.save(user);
    }

    async login(loginUserDto: LoginUserDto): Promise<{ user: User; token: string }> {
        const { email, password } = loginUserDto;
        const user = await this.userRepository.findOne({ where: { email } });
        
        if (!user) {
            throw new BadRequestException('Invalid credentials');
        }

        const isPasswordValid = await this.validatePassword(password, user.password);
        console.log('user',isPasswordValid);

        if (!isPasswordValid) {
            throw new BadRequestException('Invalid credentials');
        }

        const token = this.generateJwtToken(user);  // Ensure this method is defined

        return { user, token };
    }

    private async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }

    private generateJwtToken(user: User): string {
        const payload = { sub: user.id, email: user.email };
        console.log('payload',payload);
        return this.jwtService.sign(payload);
    }
}