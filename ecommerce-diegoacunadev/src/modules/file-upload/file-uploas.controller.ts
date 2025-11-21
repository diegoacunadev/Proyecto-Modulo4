import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileUploasService } from './file-uploas.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../../guards/auth.guards';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('files')
export class FileUploasController {
  constructor(private readonly fileUploasService: FileUploasService) {}

  @Put('uploadImage/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard) //guardian
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200000,
            message: 'El tamaño maxiimo es de 200kb',
          }),
          new FileTypeValidator({
            fileType: /^image\/(jpg|jpeg|png|webp)$/i,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.fileUploasService.uploadImage(file, id);
  }
}
