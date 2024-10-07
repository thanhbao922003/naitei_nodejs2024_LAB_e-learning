import { Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  ManyToOne, 
  CreateDateColumn, 
  UpdateDateColumn, 
  JoinColumn 
} from 'typeorm';
import { User } from './User';
import { Course } from './Course';

@Entity('reviews')
export class Review {
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
      id!: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
      user!: User;

    @ManyToOne(() => Course)
    @JoinColumn({ name: 'course_id' })
      course!: Course;

    @Column('integer')
      rating!: number;

    @Column({ type: 'bigint' })
      user_id!: number;

    @Column({ type: 'bigint' })
      course_id!: number;

    @CreateDateColumn({ type: 'datetime' })
      created_at!: Date;

    @UpdateDateColumn({ type: 'datetime' })
      updated_at!: Date;

    constructor(reviewData?: Partial<Review>) {
      reviewData && Object.assign(this, reviewData);
    }
}
