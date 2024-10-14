import { Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  ManyToOne, 
  CreateDateColumn, 
  UpdateDateColumn, 
  JoinColumn 
} from 'typeorm';
import { Section } from './Section';

@Entity('lessons')
export class Lesson {
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
      id!: number;

    @ManyToOne(() => Section)
    @JoinColumn({ name: 'section_id' })
      section!: Section;

    @Column()
      name!: string;

    @Column('text')
      description!: string;

    @Column('integer')
      time!: number;

    @Column({ type: 'bigint' })
      section_id!: number;

    @CreateDateColumn({ type: 'datetime' })
      created_at!: Date;

    @UpdateDateColumn({ type: 'datetime' })
      updated_at!: Date;

    constructor(lessonData?: Partial<Lesson>) {
      lessonData && Object.assign(this, lessonData);
    }
}
