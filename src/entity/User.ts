import { Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  UpdateDateColumn 
} from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
      id!: number;

    @Column()
      name!: string;

    @Column()
      email!: string;

    @Column()
      password!: string;

    @Column({
      type: 'enum',
      enum: ['user', 'professor', 'admin'],
      default: 'user',
    })
      role!: string;

    @CreateDateColumn({ type: 'datetime' })
      created_at!: Date;

    @UpdateDateColumn({ type: 'datetime' })
      updated_at!: Date;

    constructor(userData?: Partial<User>) {
      userData && Object.assign(this, userData);
    }
}
