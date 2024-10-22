import * as bcrypt from 'bcrypt';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/entity/user.entity';
import { Point } from 'src/entity/point.entity';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Point)
    private readonly pointsRepository: Repository<Point>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find({ relations: ['points'] });
  }

  async findOne(id: number): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['points'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }



  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Update email
    if (updateUserDto.email) {
      user.email = updateUserDto.email;
    }

    // Hash and update password if provided
    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(updateUserDto.password, salt);
      user.password = hashedPassword;
    }

    // Update level
    if (updateUserDto.level !== undefined) {
      user.level = updateUserDto.level;
    }

    // Update badge
    if (updateUserDto.badge) {
      user.badge = updateUserDto.badge;
    }

    // Update role
    if (updateUserDto.roles) {
    }

    return await this.usersRepository.save(user);
  }

  async updatePoints(userId: number, points: number): Promise<Point> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const point = this.pointsRepository.create({ points, user });
    return await this.pointsRepository.save(point);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
