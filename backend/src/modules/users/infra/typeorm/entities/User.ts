import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  avatar: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  occupation: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar' })
  getAvatarUrl(): string | null {
    return this.avatar
      ? `${process.env.APP_API_URL}/files/uploads/${this.avatar}`
      : null;
  }
}
