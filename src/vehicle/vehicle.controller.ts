import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/@decorator/roles.decorator';
import { JwtAuthGuard } from 'src/@guards/jwt.guard';
import { RolesGuard } from 'src/@guards/roles.guard';
import { UserRole } from 'src/auth/entity/user.entity';
import { RegisterVehicleDto, UpdateVehicleDto } from './dto/vehicle.dto';
import { VehicleService } from './vehicle.service';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  // ---------- REGISTER VEHICLE -- ADMIN ENDPOINT ---------- //
  @Post()
  @ApiOperation({
    summary: 'Register a vehicle',
    description: `Roles: ${UserRole.ADMIN}`,
  })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  registerVehicle(@Body() payload: RegisterVehicleDto) {
    return this.vehicleService.registerVehicle(payload);
  }

  // ---------- GET ALL VEHICLES -- ADMIN ENDPOINT ---------- //
  @Get()
  @ApiOperation({
    summary: 'Get all vehicle lists',
    description: `Roles: ${UserRole.ADMIN}`,
  })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  getAllVehicles() {
    return this.vehicleService.getAllVehicles();
  }

  // ---------- GET SINGLE VEHICLE -- ADMIN ENDPOINT ---------- //
  @Get(':vehicle_id')
  @ApiOperation({
    summary: 'Get single vehicle description',
    description: `Roles: ${UserRole.ADMIN}`,
  })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  getVehicle(@Param('vehicle_id', ParseUUIDPipe) vehicle_id: string) {
    return this.vehicleService.getVehicle(vehicle_id);
  }

  // ---------- EDIT A VEHICLE -- ADMIN ENDPOINT ---------- //
  @Patch(':vehicle_id')
  @ApiOperation({
    summary: 'Update a vehicle',
    description: `Roles: ${UserRole.ADMIN}`,
  })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  updateVehicle(
    @Param('vehicle_id', ParseUUIDPipe) vehicle_id: string,
    @Body() payload: UpdateVehicleDto,
  ) {
    return this.vehicleService.updateVehicle(vehicle_id, payload);
  }

  // ---------- ASSIGN A DRIVER TO VEHICLE -- ADMIN ENDPOINT ---------- //
  @Patch('assign-driver/:vehicle_id')
  @ApiOperation({
    summary: 'Assign vehicle to a driver.',
    description: `Roles: ${UserRole.ADMIN}`,
  })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  assignDriver(
    @Param('vehicle_id', ParseUUIDPipe) vehicle_id: string,
    @Body() payload: UpdateVehicleDto,
  ) {
    return this.vehicleService.updateVehicle(vehicle_id, payload);
  }

  // ---------- DELETE A VEHICLE -- ADMIN ENDPOINT ---------- //
  @Delete(':vehicle_id')
  @ApiOperation({
    summary: 'Remove a vehicle.',
    description: `Roles: ${UserRole.ADMIN}`,
  })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  deleteVehicle(@Param('vehicle_id', ParseUUIDPipe) vehicle_id: string) {
    return this.vehicleService.deleteVehicle(vehicle_id);
  }
}
