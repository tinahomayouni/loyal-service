import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';
import { Role } from 'src/entity/role.entity'; // Import Role entity

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Role) // Inject Role repository
        private roleRepository: Repository<Role>,
        private jwtService: JwtService,
    ) {}

    async findById(id: number): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { id } });
    }

    async register(createUserDto: RegisterUserDto): Promise<User> {
        const { email, password, roles } = createUserDto;
    
        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new BadRequestException('User already exists');
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Fetch Role entities based on role IDs provided
        const roleEntities = await this.roleRepository.findByIds(roles); // This expects an array of role IDs
    
        const user = this.userRepository.create({ email, password: hashedPassword, roles: roleEntities });
        return this.userRepository.save(user);
    }
    
    async login(loginUserDto: LoginUserDto): Promise<{ user: User; token: string }> {
        const { email, password } = loginUserDto;
        const user = await this.userRepository.findOne({ where: { email }, relations: ['roles'] }); // Fetch roles if needed

        if (!user) {
            throw new BadRequestException('Invalid credentials');
        }

        const isPasswordValid = await this.validatePassword(password, user.password);

        if (!isPasswordValid) {
            throw new BadRequestException('Invalid credentials');
        }

        const token = this.generateJwtToken(user);

        return { user, token };
    }

    private async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }

    private generateJwtToken(user: User): string {
        const payload = { sub: user.id, email: user.email };
        return this.jwtService.sign(payload);
    }
}
