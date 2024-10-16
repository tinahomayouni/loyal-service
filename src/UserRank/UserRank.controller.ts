import { Controller, Post, Get, Param } from '@nestjs/common';
import { UserRankService } from './UserRank.service';

@Controller('user-rank')
export class UserRankController {
  constructor(private readonly userRankService: UserRankService) {}


}
