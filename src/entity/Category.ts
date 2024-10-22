import { Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn,
    OneToMany 
  } from 'typeorm';
  import { Course } from './Course';
  
  @Entity('categories')
  export class Category {
      @PrimaryGeneratedColumn('increment', { type: 'bigint' })
      id!: number;
  
      @Column()
      name!: string;
  
      @OneToMany(() => Course, (course) => course.category)
      courses!: Course[];
  
      @CreateDateColumn({ type: 'datetime' })
      created_at!: Date;
  
      @UpdateDateColumn({ type: 'datetime' })
      updated_at!: Date;
  
      constructor(categoryData?: Partial<Category>) {
        categoryData && Object.assign(this, categoryData);
      }
  }
  