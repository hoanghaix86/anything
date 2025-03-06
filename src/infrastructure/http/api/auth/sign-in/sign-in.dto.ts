import {
    IsString,
    IsNotEmpty,
    IsEmail,
    MinLength,
    MaxLength,
} from 'class-validator'

export class SignInDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(64)
    password: string
}
