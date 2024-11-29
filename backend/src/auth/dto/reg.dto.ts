import { IsEmail, IsString, Length } from "class-validator";

export class RegDto {

    @IsString({message: "Должно быть строкой"})
    readonly username: string;
    
    @IsString({message: "Должно быть строкой"})
    @IsEmail({}, {message: "Некорректный email"})
    readonly email: string;

    @IsString({message: "Должно быть строкой"})
    @Length(4, Number.MAX_VALUE, {message: "Пароль не меньше 4 символов"})
    readonly password: string;
}