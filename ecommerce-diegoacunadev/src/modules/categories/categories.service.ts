import { Injectable } from '@nestjs/common';
import data from '../../data.json';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
  ) {}

  async seeder() {
    const categoryNames: Set<string> = new Set(
      data.map((product) => product.category),
    );
    const categoriesArray: string[] = Array.from(categoryNames);

    const categories = categoriesArray.map((category) => ({
      name: category,
    }));

    await this.categoriesRepository.upsert(categories, ['name']);

    return 'Categoria agregada';
  }
}
