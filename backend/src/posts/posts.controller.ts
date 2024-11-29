import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, Req, UseInterceptors, Put, Query, HttpException, HttpStatus } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseInterceptors(FileInterceptor("img"))
  create(@Body() createPostDto: CreatePostDto, @UploadedFile() img: any,
          @Req() req: Request) {
    const token = req.headers.authorization?.split(" ")[1];
    return token ? this.postsService.create(createPostDto, img, token)
            : new HttpException("Требуется авторизация", HttpStatus.UNAUTHORIZED);
  }

  @Get()
  findAll(@Query("cat") cat: string) {
    return this.postsService.findAll(cat);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Put()
  @UseInterceptors(FileInterceptor("img"))
  update(@Body() updatePostDto: UpdatePostDto, @UploadedFile() img: any,
        @Req() req: Request) {
          const token = req.headers.authorization?.split(" ")[1];
          return token ? this.postsService.update(updatePostDto, img, token)
                  : new HttpException("Требуется авторизация", HttpStatus.UNAUTHORIZED);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
