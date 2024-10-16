// src/auth/local.strategy.ts

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from 'src/entity/user.entity';
import { UsersService } from 'src/user/user.service';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.usersService.login({ email, password });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    return user;
  }
}
