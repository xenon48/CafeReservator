import { ApiProperty } from "@nestjs/swagger";

export class loginDto {
    @ApiProperty()
    readonly login: string;
    @ApiProperty()
    readonly password: string;

}