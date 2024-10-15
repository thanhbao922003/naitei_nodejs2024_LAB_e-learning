import { AppDataSource } from '../repos/db';
import { Course } from '../entity/Course';
import { Enrollment } from '../entity/Enrollment';
import { Section } from '../entity/Section';
import { Lesson } from '../entity/Lesson';
import { Component } from '../entity/Component'; 

const enrollmentRepository = AppDataSource.getRepository(Enrollment);
const courseRepository = AppDataSource.getRepository(Course);
const componentRepository = AppDataSource.getRepository(Component);
const sectionRepository = AppDataSource.getRepository(Section);
const lessonRepository = AppDataSource.getRepository(Lesson);

export async function getAllCourses() {
  return await courseRepository.find({
    select: ['id', 'name', 'price', 'description', 'average_rating', 'created_at', 'updated_at'],
    order: { name: 'ASC' },
  });
}

export const getCoursesWithSectionsAndHours = async () => {
  const courses = await getAllCourses();

  if (courses.length === 0) {
    throw new Error('No courses found.');
  }

  return await Promise.all(
    courses.map(async (course) => {
      const sectionsWithLessons = await getSectionsWithLessons(course.id);
      const totalHours = sectionsWithLessons.reduce(
        (sum, section) => sum + section.total_time,
        0
      );

      return {
        ...course,
        sectionsWithLessons,
        totalHours,
      };
    })
  );
};

export async function getSectionsWithLessons(courseId: number) {
  const sections = await sectionRepository.find({
    where: { course: { id: courseId } },
  });

  return await Promise.all(
    sections.map(async (section) => {
      const lessons = await lessonRepository.find({
        where: { section: { id: section.id } },
        select: ['id', 'name', 'description', 'time', 'created_at', 'updated_at'],
      });

      const lessonsWithComponents = await Promise.all(
        lessons.map(async (lesson) => {
          const components = await componentRepository.find({
            where: { lesson: { id: lesson.id } },
          });

          return { 
            ...lesson, 
            components, 
            enrollmentLessonId: lesson.id 
          };
        })
      );

      return {
        ...section,
        lessons: lessonsWithComponents,
        total_time: lessons.reduce((sum, lesson) => sum + lesson.time, 0),
      };
    })
  );
}

export async function countEnrolledUsersInCourse(courseId: number): Promise<number> {
  return await enrollmentRepository.count({
    where: {
      course: { id: courseId },
      user: { role: 'user' },
    },
    relations: ['user'],
  });
}

interface courseFilter {
  professorId?: number;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  name?: string;
}

interface courseSorting {
  sortBy?: 'price' | 'average_rating' | 'created_at';
  order?: 'ASC' | 'DESC';
}


export const getCourseById = async (id: number) => {
  return await courseRepository.findOne({
    where: { id: id },
  });
};

export async function filterAndSortCourses(
  filters: courseFilter,
  sorting: courseSorting,
) {
  const query = courseRepository.createQueryBuilder('course');

  if (filters.professorId) {
    query.andWhere('course.professor_id = :professorId', {
      professorId: filters.professorId,
    });
  }

  if (filters.minPrice) {
    query.andWhere('course.price >= :minPrice', {
      minPrice: filters.minPrice,
    });
  }

  if (filters.maxPrice) {
    query.andWhere('course.price <= :maxPrice', { maxPrice: filters.maxPrice });
  }

  if (filters.minRating) {
    query.andWhere('course.average_rating >= :minRating', { minRating: filters.minRating });
  }

  if (filters.name) {
    query.andWhere('course.name LIKE :name', { name: `%${filters.name}%` });
  }

  if (sorting.sortBy) {
    query.orderBy(`course.${sorting.sortBy}`, sorting.order || 'ASC');
  } else {
    query.orderBy('course.created_at', 'DESC');
  }
  
  return await query.getMany();
}
