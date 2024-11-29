import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdatePostDto extends PartialType(CreatePostDto) {
    
    @IsString({message: "ID должен быть строкой"})
    id: string;
}
