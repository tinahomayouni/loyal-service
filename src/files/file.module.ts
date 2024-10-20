// src/files/files.module.ts
import { Module } from '@nestjs/common';
import { FilesController } from './file.controller';
import { FilesService } from './file.service';
import { MulterModule } from '@nestjs/platform-express';


@Module({
  imports: [
    MulterModule.register({ dest: './uploads' }), // Configure file storage location
  ],
  controllers: [FilesController],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
