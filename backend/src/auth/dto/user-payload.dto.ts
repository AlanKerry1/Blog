export class UserPayloadDto {
    id: string;
    email: string;
    isActivated: boolean;

    constructor(model) {
        this.email = model.email;
        this.id = model.id;
        this.isActivated = model.isActivated;
    }
}