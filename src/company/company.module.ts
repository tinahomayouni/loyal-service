// src/files/files.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Import TypeOrmModule
import { User } from 'src/entity/user.entity';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { Company } from 'src/entity/company.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Company]), 
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
  exports: [CompanyService],
})
export class CompanyModule {}
