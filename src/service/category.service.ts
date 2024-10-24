import { AppDataSource } from '../repos/db';
import { Category } from '../entity/Category';

const categoryRepository = AppDataSource.getRepository(Category);

export async function getAllCategories() {
  return await categoryRepository.find({
    select: ['id', 'name', 'created_at', 'updated_at'],
    order: { name: 'ASC' },
  });
}
