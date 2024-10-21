import { AppDataSource } from "../repos/db";
import { Section } from "../entity/Section";
import { Course } from "../entity/Course";

const sectionRepository = AppDataSource.getRepository(Section)
const courseRepository = AppDataSource.getRepository(Course)


export const getAllSections = async () => {
    return await sectionRepository.find({
        relations: ['course']
    })
}

export async function createSection(data: Partial<Section>): Promise<Section> {
    const newSection = sectionRepository.create({
        name: data.name,
        total_time: data.total_time,
        total_lesson: data.total_lesson, 
        course_id: data.course_id 
    });
  
    return await sectionRepository.save(newSection);
}

export const updateSection = async (id: number, courseData: any) => {
    const section = await sectionRepository.findOne({
      where: { id },
      relations: ['course'],
    });
  
    if (!section) {
      throw new Error(`Section with ID ${id} not found.`);
    }
  
    if (!courseData.course_id) {
      throw new Error(`course_id is required to update section.`);
    }
  
    const course = await courseRepository.findOne({
      where: { id: courseData.course_id },
    });
  
    if (!course) {
      throw new Error(`Course with ID ${courseData.course_id} not found.`);
    }
  
    section.name = courseData.name;
    section.total_time = courseData.total_time;
    section.total_lesson = courseData.total_lesson;
    section.course = course;
  
    return await sectionRepository.save(section);
  };
  
  export async function deleteSection(id: number): Promise<boolean> {
    const result = await sectionRepository.delete(id);
    return result.affected !== 0;
  }