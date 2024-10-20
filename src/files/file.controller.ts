// src/files/files.controller.ts
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { CustomFileInterceptor } from '../common/interceptors/file.interceptor';
import { Express } from 'express';
import { FilesService } from './file.service';

@ApiTags('files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('upload') // Endpoint for uploading files
  @UseInterceptors(CustomFileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    // Delegate file handling to the FileService
    return await this.filesService.uploadFile(file);
  }
}
