import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from './entities/posts.model';
import { Repository } from 'typeorm';
import { FilesService } from 'src/files/files.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Posts) private postsRep: Repository<Posts>,
              private filesService: FilesService, private jwtService: JwtService){}

  async create(createPostDto: CreatePostDto, image: any, accessToken: string) {
    const {id: userId} = this.jwtService.decode(accessToken);
    const fileName = await this.filesService.createFile(image)
    const post = this.postsRep.create({...createPostDto, img: fileName, user: {id: userId}});
    await this.postsRep.save(post);
    return post;
  }

  async findAll(cat) {
    return cat ? await this.postsRep.find({where: {cat}})
      : await this.postsRep.find();
  }

  async findOne(id: number) {
    return await this.postsRep.findOne({where: {id}, relations: ["user"]});
  }

  async update(updatePostDto: UpdatePostDto, image: any, accessToken: string) {
    const post = await this.postsRep.findOne({where: {id: +updatePostDto.id}});

    if (!post) {
      throw new HttpException("Поста с таким ID не существует", HttpStatus.BAD_REQUEST);
    }
  
    let fileName = post.img;

    if (image) {
      await this.filesService.deleteFile(fileName);
      fileName = await this.filesService.createFile(image);
    }

    await this.postsRep.update({id: +updatePostDto.id}, {...post, ...updatePostDto, img: fileName, id: +updatePostDto.id});
    return await this.postsRep.findOne({where: {id: +updatePostDto.id}});;
  }

  async remove(id: number) {
    const post = await this.postsRep.findOne({where: {id}})
    await this.filesService.deleteFile(post.img);
    await this.postsRep.delete({id});
    return post;
  }
}
