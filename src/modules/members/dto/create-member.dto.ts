import { IsEmail, IsString, MinLength, IsPhoneNumber, IsOptional } from 'class-validator';

export class CreateTeamMemberDto {
    @IsString()
    fullName: string;

    @IsEmail()
    email: string;

    @IsPhoneNumber()
    @IsOptional()
    phoneNumber?: string;

    @IsString()
    @MinLength(8)
    password: string;

    @IsString()
    roleLabel: string;
}