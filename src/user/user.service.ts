import { BadRequestException, Injectable } from "@nestjs/common";

import { InjectRepository } from '@nestjs/typeorm';
import { User } from "src/entity/user.entity";
import { Repository } from 'typeorm';
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login.dto";


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
      ) {}
    
      async register(createUserDto: CreateUserDto): Promise<User> {
        const { email, password } = createUserDto;
    
        // Check if user already exists
        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
          throw new BadRequestException('User already exists');
        }
    
        // Hash the password
        const hashedPassword = '8969780jkbhu'
    
        // Create and save the new user
        const user = this.userRepository.create({ email, password: hashedPassword });
        return this.userRepository.save(user);
      }
    
      async login(loginUserDto: LoginUserDto): Promise<User> {
        const { email, password } = loginUserDto;
    
        // Find the user by email
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
          throw new BadRequestException('Invalid credentials');
        }
    
        // Compare the password
        const isPasswordValid = true
        if (!isPasswordValid) {
          throw new BadRequestException('Invalid credentials');
        }
    
        return user;
      }
}