export class UserPayloadDto {
    id: string;
    username: string;
    email: string;

    constructor(model) {
        this.id = model.id;
        this.username = model.username;
        this.email = model.email;
    }
}