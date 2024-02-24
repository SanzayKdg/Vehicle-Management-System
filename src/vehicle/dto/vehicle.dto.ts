import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { VehicleStatus } from '../entity/vehicle.entity';
import {
  IsDateString,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class RegisterVehicleDto {
  @ApiProperty({ example: 'Pulsar 150' })
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty({ example: '2023-06-01T10:18:00.310Z' })
  @IsDateString()
  @IsNotEmpty()
  manufactured_year: Date;

  @ApiProperty({ example: 'BAA 1 PA 1976' })
  @IsString()
  @IsNotEmpty()
  registration_number: string;

  @ApiProperty({ example: 'Kathmandu' })
  @IsNotEmpty()
  @IsString()
  location: string;
}
export class UpdateVehicleDto {
  @ApiPropertyOptional({ example: 'Pulsar 150' })
  @IsString()
  @IsOptional()
  model: string;

  @ApiPropertyOptional({ example: '2023-06-01T10:18:00.310Z' })
  @IsDateString()
  @IsOptional()
  manufactured_year: Date;

  @ApiPropertyOptional({ example: 'BAA 1 PA 1976' })
  @IsString()
  @IsOptional()
  registration_number: string;

  @ApiPropertyOptional({
    example: `${VehicleStatus.INACTIVE}`,
    enum: VehicleStatus,
  })
  @IsOptional()
  @IsEnum(VehicleStatus)
  @IsIn([
    VehicleStatus.ACTIVE,
    VehicleStatus.INACTIVE,
    VehicleStatus.RETIRED,
    VehicleStatus.UNDER_MAINTENANCE,
  ])
  current_status: VehicleStatus;

  @ApiPropertyOptional({ example: 'Kathmandu' })
  @IsOptional()
  @IsString()
  location: string;

  @ApiPropertyOptional({ example: 'd0b0d7e0-4c4b-4f3a-8b0a-5d2b7d4e1a0e' })
  @IsUUID()
  @IsOptional()
  assigned_to: string;
}
