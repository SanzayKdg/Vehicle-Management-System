import { Vehicle } from 'src/vehicle/entity/vehicle.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserRole {
  ADMIN = 'ADMIN',
  DRIVER = 'DRIVER',
  USER = 'USER',
}

@Entity({
  name: 'user',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  full_name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone_number?: string;

  @Column({ type: 'enum', default: UserRole.USER, enum: UserRole })
  user_role: UserRole;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // ----------------- RELATIONS -----------------

  // ----------------- VEHICLE -----------------
  @OneToOne(() => Vehicle, (vehicle) => vehicle.user)
  vehicle: Vehicle;
}
