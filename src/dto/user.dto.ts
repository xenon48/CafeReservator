import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/user/user.entity";

export class UserDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    login: string;
    @ApiProperty()
    role: string;
    @ApiProperty()
    telegram: string;
    @ApiProperty()
    phone: string;

    constructor(data: User) {
        this.id = data.id;
        this.name = data.name;
        this.login = data.login;
        this.role = data.role;
        this.telegram = data.telegram;
        this.phone = data.phone;
    }
}

export class createUserDto {
    @ApiProperty()
    readonly name: string;
    @ApiProperty()
    readonly login: string;
    @ApiProperty()
    readonly password: string;
    @ApiProperty()
    readonly role: string;
    @ApiProperty()
    readonly phone: string;
    @ApiProperty()
    readonly telegram: string;
}