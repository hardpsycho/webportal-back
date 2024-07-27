import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, MinLength } from "class-validator"

export class SignUpBodyDto {
    @ApiProperty({
        example: 'email@example.com'
    })
    @IsEmail()
    email!: string

    @ApiProperty({
        example: 'qwerty'
    })
    @IsNotEmpty()
    @MinLength(6)
    password!: string
}

export class SignInBodyDto {
    @ApiProperty({
        example: 'email@example.com'
    })
    @IsEmail()
    email!: string

    @ApiProperty({
        example: 'qwerty'
    })
    @IsNotEmpty()
    @MinLength(6)
    password!: string
}


export class GetSessionInfoDto {
    @ApiProperty({
        example: 1
    })
    id!: number

    @ApiProperty({
        example: 'email@example.com'
    })
    email!: string

    @ApiProperty({
        example: 45646465
    })
    iat!: number

    @ApiProperty({
        example: 456464654
    })
    exp!: number
}