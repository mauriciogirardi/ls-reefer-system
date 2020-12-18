import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import User from '@modules/users/infra/typeorm/entities/User';

@Entity('appointments')
export default class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('time with time zone')
  date: Date;

  @Column('uuid')
  customer_id: string;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  technician: string;

  @Column()
  typeService: string;

  @Column()
  device: string;

  @Column('int')
  btus: number;

  @Column('int')
  quantity: number;

  @Column()
  electric: string;

  @Column('decimal')
  price: number;

  @Column()
  placeOfService: string;

  @Column()
  placeOfInstallation: string;

  @Column()
  obs: string;

  @Column('boolean')
  status: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
