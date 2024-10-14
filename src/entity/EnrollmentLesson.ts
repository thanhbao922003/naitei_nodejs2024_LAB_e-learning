import { Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  ManyToOne, 
  CreateDateColumn, 
  UpdateDateColumn, 
  JoinColumn 
} from 'typeorm';
import { Enrollment } from './Enrollment';
import { Lesson } from './Lesson';

@Entity('enrollments_lessons')
export class EnrollmentLesson {
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
      id!: number;

    @ManyToOne(() => Enrollment)
    @JoinColumn({ name: 'enrollment_id' })
      enrollment!: Enrollment;

    @ManyToOne(() => Lesson)
    @JoinColumn({ name: 'lesson_id' })
      lesson!: Lesson;

    @Column('integer')
      progress!: number;

    @Column({ type: 'datetime' })
      completion_date!: Date;

    @Column({ type: 'bigint' })
      enrollment_id!: number;

    @Column({ type: 'bigint' })
      lesson_id!: number;

    @CreateDateColumn({ type: 'datetime' })
      created_at!: Date;

    @UpdateDateColumn({ type: 'datetime' })
      updated_at!: Date;

    constructor(enrollmentLessonData?: Partial<EnrollmentLesson>) {
      enrollmentLessonData && Object.assign(this, enrollmentLessonData);
    }
}
