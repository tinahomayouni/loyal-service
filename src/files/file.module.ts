// src/files/files.module.ts
import { Module } from '@nestjs/common';
import { FilesController } from './file.controller';
import { FilesService } from './file.service';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm'; // Import TypeOrmModule
import { User } from 'src/entity/user.entity';


@Module({
  imports: [
    MulterModule.register({ dest: './uploads' }), // Configure file storage location
    TypeOrmModule.forFeature([User, File]), // Register User and File entities
  ],
  controllers: [FilesController],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
