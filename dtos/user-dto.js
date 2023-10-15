export default class UserDto {
    username;
    id;
    password;

    constructor(model) {
        this.username = model.username;
        this.password = model.password;
        this.id = model._id;
    }
}

