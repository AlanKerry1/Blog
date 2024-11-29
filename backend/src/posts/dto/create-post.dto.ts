import { IsEmpty, IsEnum, IsString } from "class-validator";

enum Category {
    ART = "art",
    SCIENCE = "science",
    TECHNOLOGY = "technology",
    CINEMA = "cinema",
    DESIGN = "design",
    FOOD = "food"
}

export class CreatePostDto {

    @IsString({message: "Должно быть строкой"})
    title: string;
    
    @IsString({message: "Должно быть строкой"})
    desc: string;

    @IsString({message: "Должно быть строкой"})
    @IsEnum(Category, {message: "Несуществующая категория"})
    cat: string;
}
