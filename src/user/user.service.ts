import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/entity/user.entity';
import { Point } from 'src/entity/point.entity';
import { UpdatePointsDto } from './dto/update-point.dto';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Point)
    private pointsRepository: Repository<Point>,
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

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.usersRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async updatePoints(id: number, updatePointsDto: UpdatePointsDto): Promise<Point> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const point = this.pointsRepository.create({ points: updatePointsDto.points, user });
    return await this.pointsRepository.save(point);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
