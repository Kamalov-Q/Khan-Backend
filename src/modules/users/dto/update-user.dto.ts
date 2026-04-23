import { IsEmail, IsString, IsOptional, IsBoolean, IsPhoneNumber } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    fullName?: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsPhoneNumber()
    @IsOptional()
    phoneNumber?: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;

    @IsString()
    @IsOptional()
    roleLabel?: string;
}