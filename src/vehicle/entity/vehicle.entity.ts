import { User } from 'src/auth/entity/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum VehicleStatus {
  ACTIVE = 'ACTIVE',
  RETIRED = 'RETIRED',
  UNDER_MAINTENANCE = 'UNDER_MAINTENANCE',
  INACTIVE = 'INACTIVE',
}

@Entity({
  name: 'vehicle',
})
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  model: string;

  @Column()
  manufactured_year: Date;

  @Column()
  registration_number: string;

  @Column({
    type: 'enum',
    default: VehicleStatus.INACTIVE,
    enum: VehicleStatus,
  })
  current_status: VehicleStatus;

  @Column()
  location: string;

  // ----------------- RELATIONS -----------------

  // ----------------- USER -----------------
  @Column({ default: null })
  assigned_to: string;

  @OneToOne(() => User, (user) => user.vehicle, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'assigned_to' })
  user: User;
}
