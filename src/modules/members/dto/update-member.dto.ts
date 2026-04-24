import { IsString, IsOptional, IsPhoneNumber, IsEmail } from 'class-validator';

export class UpdateTeamMemberDto {
    @IsString()
    @IsOptional()
    fullName?: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsPhoneNumber()
    @IsOptional()
    phoneNumber?: string;

    @IsString()
    @IsOptional()
    roleLabel?: string;
}