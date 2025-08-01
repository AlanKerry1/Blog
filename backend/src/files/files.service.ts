import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from "fs"
import * as uuid from "uuid";

@Injectable()
export class FilesService {

    async createFile(file) {
        try {
            const fileName = uuid.v4() + ".jpg";
            const filePath = path.resolve(__dirname, "..", "static");
            
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true});
            }
            
            fs.writeFileSync(path.join(filePath, fileName), file.buffer);
            return fileName;
        } catch (e) {
            throw new HttpException("Произошла ошибка при записи файла", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteFile(file) {
        try {
            const filePath = path.resolve(__dirname, "..", "static", file);

            if (fs.existsSync(filePath)) {
                fs.rmSync(filePath);
            }
        } catch (e) {
            throw new HttpException("Произошла ошибка при удалении файла", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
