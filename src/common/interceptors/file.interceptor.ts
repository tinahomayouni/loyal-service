import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

const allowedFormats = ['image/jpeg', 'image/jpg', 'image/png'];

export const multerConfig = {
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (allowedFormats.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG, JPG, and PNG files are allowed'), false);
    }
  },
  storage: diskStorage({
    destination: './uploads', // Ensure this directory exists
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
    },
  }),
};

export function CustomFileInterceptor(fieldName: string) {
  return FileInterceptor(fieldName, multerConfig);
}
