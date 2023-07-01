import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class loginDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    readonly login: string;
    @ApiProperty({ required: true })
    @IsNotEmpty()
    readonly password: string;

}