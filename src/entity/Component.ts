import { Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  ManyToOne, 
  CreateDateColumn, 
  UpdateDateColumn, 
  JoinColumn 
} from 'typeorm';
import { Lesson } from './Lesson';

@Entity('components')
export class Component {
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
      id!: number;

    @ManyToOne(() => Lesson)
    @JoinColumn({ name: 'lesson_id' })
      lesson!: Lesson;

    @Column({
      type: 'enum',
      enum: ['video', 'url', 'pdf', 'text'],
    })
      type!: string;

    @Column('text')
      content!: string;

    @CreateDateColumn({ type: 'datetime' })
      created_at!: Date;

    @UpdateDateColumn({ type: 'datetime' })
      updated_at!: Date;

    constructor(componentData?: Partial<Component>) {
      componentData && Object.assign(this, componentData);
    }
}
