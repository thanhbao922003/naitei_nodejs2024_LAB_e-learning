import { Entity,
  Column, 
  PrimaryGeneratedColumn, 
  ManyToOne, 
  JoinColumn, 
  CreateDateColumn, 
  UpdateDateColumn, 
} from 'typeorm';
import { Review } from './Review';

@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
      id!: number;

    @ManyToOne(() => Review)
    @JoinColumn({ name: 'review_id' })
      review!: Review;

    @Column({ type: 'bigint' })
      parent_id!: number;

    @Column('text')
      comment_text!: string;

    @Column({ type: 'bigint' })
      review_id!: number;

    @CreateDateColumn({ type: 'datetime' })
      created_at!: Date;

    @UpdateDateColumn({ type: 'datetime' })
      updated_at!: Date;

    constructor(commentData?: Partial<Comment>) {
      commentData && Object.assign(this, commentData);
    }
}
