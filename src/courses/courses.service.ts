import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CoursesService {
  private readonly logger = new Logger(CoursesService.name);
  constructor(
    @InjectRepository(Course) 
    private courseRepository: Repository<Course>
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    return this.courseRepository.save(createCourseDto);
  }

  async findAll() {
    this.logger.log('Getting all courses', Math.random().toString());
    return this.courseRepository.find({});
  }

  async findOne(id: string) {
    console.log('Get by id', id);
    try{
      const course = await this.courseRepository.findOne({ where: { id } });
      if (!course) {
        throw new Error('Course not found');
      }
      return course;
    } catch (error) {
      console.error('Error', error.message);
    }
    return {} as Course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<string | Course> {
    const course = await this.courseRepository.findOne({ where: { id } });
    if (course) {
      return this.courseRepository.save({ ...course, ...updateCourseDto });
    }
    return course.id;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
