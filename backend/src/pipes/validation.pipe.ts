import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata) {
        const obj = plainToClass(metadata.metatype, value);
        const errors = await validate(obj);

        if (errors.length) {
            let messages = {message: errors.map(err => {
                return `${err.property} - ${Object.values(err.constraints).join(', ')}`;
            })};
            throw new HttpException(messages, HttpStatus.BAD_REQUEST);
        }

        return value;
    }
}