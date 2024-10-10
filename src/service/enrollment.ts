import { AppDataSource } from '../repos/db';
import { Enrollment } from '../entity/Enrollment';
import { User } from '../entity/User';
import { Course } from '../entity/Course';
import { EnrollmentLesson } from '../entity/EnrollmentLesson';
import { Lesson } from '../entity/Lesson';

export class EnrollmentService {
  private enrollmentRepository = AppDataSource.getRepository(Enrollment);
  private courseRepository = AppDataSource.getRepository(Course);
  private userRepository = AppDataSource.getRepository(User);
  private enrollmentLessonRepository = AppDataSource.getRepository(EnrollmentLesson);
  private lessonRepository = AppDataSource.getRepository(Lesson);

  async enrollUserInCourse(userId: number, courseId: number): Promise<Enrollment> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const course = await this.courseRepository.findOne({ where: { id: courseId } });

    if (!user || !course) {
      throw new Error('User or Course not found');
    }

    const enrollment = this.enrollmentRepository.create({
      user,
      course,
      enrollment_date: new Date(),
      progress: 0,
    });

    await this.enrollmentRepository.save(enrollment);

    const lessons = await this.lessonRepository.find({ where: { section: { course_id: courseId } } });
    const enrollmentLessons = lessons.map(lesson => this.enrollmentLessonRepository.create({
      enrollment,
      lesson,
      progress: 0,
    }));

    await this.enrollmentLessonRepository.save(enrollmentLessons);

    return enrollment;
  }

  async getUserEnrollments(userId: number): Promise<Enrollment[]> {
    return this.enrollmentRepository.find({
      where: { user: { id: userId } },
      relations: ['course'],
    });
  }

  async updateLessonProgress(enrollmentId: number, lessonId: number, progress: number): Promise<EnrollmentLesson> {
    const enrollmentLesson = await this.enrollmentLessonRepository.findOne({
      where: { enrollment_id: enrollmentId, lesson_id: lessonId },
    });

    if (!enrollmentLesson) {
      throw new Error('EnrollmentLesson not found');
    }

    enrollmentLesson.progress = progress;

    if (progress === 100) {
      enrollmentLesson.completion_date = new Date();
    }

    await this.enrollmentLessonRepository.save(enrollmentLesson);

    return enrollmentLesson;
  }
}
