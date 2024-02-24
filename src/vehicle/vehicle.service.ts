import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { RegisterVehicleDto, UpdateVehicleDto } from './dto/vehicle.dto';
import { Vehicle } from './entity/vehicle.entity';
import { User, UserRole } from 'src/auth/entity/user.entity';

@Injectable()
export class VehicleService {
  constructor(private readonly dataSource: DataSource) {}

  // ---------- REGISTER VEHICLE -- ADMIN ENDPOINT ---------- //
  async registerVehicle(payload: RegisterVehicleDto) {
    const vehicle = await this.dataSource.getRepository(Vehicle).save(payload);

    return { message: 'Vehicle registered successfully', vehicle };
  }

  // ---------- GET ALL VEHICLES -- ADMIN ENDPOINT ---------- //
  async getAllVehicles() {
    const vehicles = await this.dataSource.getRepository(Vehicle).find();
    if (!vehicles || vehicles.length === 0)
      throw new NotFoundException('Vehicles has not been listed yet');
    return vehicles;
  }

  // ---------- GET SINGLE VEHICLE -- ADMIN ENDPOINT ---------- //
  async getVehicle(vehicle_id: string) {
    const vehicle = await this.dataSource
      .getRepository(Vehicle)
      .findOne({ where: { id: vehicle_id } });

    if (!vehicle)
      throw new NotFoundException('Vehicle does not exists or removed.');

    return vehicle;
  }
  // ---------- EDIT A VEHICLE -- ADMIN ENDPOINT ---------- //
  async updateVehicle(vehicle_id: string, payload: UpdateVehicleDto) {
    const vehicle = await this.dataSource
      .getRepository(Vehicle)
      .findOne({ where: { id: vehicle_id } });

    if (!vehicle)
      throw new NotFoundException('Vehicle does not exists or removed.');

    if (payload.assigned_to) {
      const user = await this.dataSource.getRepository(User).findOne({
        where: { id: payload.assigned_to, user_role: UserRole.USER },
      });

      if (!user) throw new BadRequestException('Invalid User.');
    }
    Object.assign(vehicle, payload);
    await this.dataSource
      .getRepository(Vehicle)
      .save({ id: vehicle_id, ...payload });

    return { message: 'Vehicle updated succssfully', vehicle };
  }

  // ---------- DELETE A VEHICLE -- ADMIN ENDPOINT ---------- //
  async deleteVehicle(vehicle_id: string) {
    const vehicle = await this.dataSource
      .getRepository(Vehicle)
      .findOne({ where: { id: vehicle_id } });

    if (!vehicle)
      throw new NotFoundException('Vehicle does not exists or removed.');

    await this.dataSource.getRepository(Vehicle).delete(vehicle_id);

    return { message: 'Vehicle removed successfully' };
  }
}
