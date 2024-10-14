import { AppDataSource } from '../repos/db';
import { Course } from '../entity/Course';
import { getRepository } from 'typeorm';

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

const courseRepository = AppDataSource.getRepository(Course);

export const getAllCourses = async () => {
  return await courseRepository.find({
    order: { name: 'ASC' },
  });
};

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

  // Apply filter
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

  // Apply sorting
  if (sorting.sortBy) {
    query.orderBy(`course.${sorting.sortBy}`, sorting.order || 'ASC');
  } else {
    // Default sorting by creation date
    query.orderBy('course.created_at', 'DESC');
  }
  
  return await query.getMany();
}
