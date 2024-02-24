import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRole } from '../entity/user.entity';

export class LoginUserDTO {
  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Password@123' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export class RegisterUserDTO extends LoginUserDTO {
  @ApiProperty({ example: 'John Doe', required: true, type: 'string' })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiPropertyOptional({ example: '+9779876543210' })
  @IsOptional()
  @IsPhoneNumber()
  phone_number?: string;

  @ApiProperty({ example: `${UserRole.USER}`, enum: UserRole })
  @IsNotEmpty()
  @IsEnum(UserRole)
  @IsIn([UserRole.USER])
  user_role: UserRole;
}
