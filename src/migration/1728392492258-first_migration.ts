import { MigrationInterface, QueryRunner } from 'typeorm';

export class FirstMigration1728392492258 implements MigrationInterface {
  name = 'FirstMigration1728392492258';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE `users` (`id` bigint NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `role` enum (\'user\', \'professor\', \'admin\') NOT NULL DEFAULT \'user\', `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `courses` (`id` bigint NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `price` double NOT NULL, `description` text NOT NULL, `average_rating` float NOT NULL, `professor_id` bigint NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `reviews` (`id` bigint NOT NULL AUTO_INCREMENT, `rating` int NOT NULL, `user_id` bigint NOT NULL, `course_id` bigint NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `sections` (`id` bigint NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `total_time` int NOT NULL, `total_lesson` int NOT NULL, `course_id` bigint NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `payments` (`id` bigint NOT NULL AUTO_INCREMENT, `amount` double NOT NULL, `payment_date` date NOT NULL, `status` enum (\'pending\', \'done\') NOT NULL, `user_id` bigint NOT NULL, `course_id` bigint NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `lessons` (`id` bigint NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `description` text NOT NULL, `time` int NOT NULL, `section_id` bigint NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `enrollments` (`id` bigint NOT NULL AUTO_INCREMENT, `enrollment_date` datetime NOT NULL, `progress` int NOT NULL, `completion_date` datetime NOT NULL, `user_id` bigint NOT NULL, `course_id` bigint NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `enrollments_lessons` (`id` bigint NOT NULL AUTO_INCREMENT, `progress` int NOT NULL, `completion_date` datetime NOT NULL, `enrollment_id` bigint NOT NULL, `lesson_id` bigint NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `components` (`id` bigint NOT NULL AUTO_INCREMENT, `type` enum (\'video\', \'url\', \'pdf\', \'text\') NOT NULL, `content` text NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `lesson_id` bigint NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `comments` (`id` bigint NOT NULL AUTO_INCREMENT, `parent_id` bigint NOT NULL, `comment_text` text NOT NULL, `review_id` bigint NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('ALTER TABLE `courses` ADD CONSTRAINT `FK_7722a465aa381126eb553158c73` FOREIGN KEY (`professor_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `reviews` ADD CONSTRAINT `FK_728447781a30bc3fcfe5c2f1cdf` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `reviews` ADD CONSTRAINT `FK_f99062f36181ab42863facfaea3` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `sections` ADD CONSTRAINT `FK_53ccbd6e2fa20dac9062f4f4c36` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `payments` ADD CONSTRAINT `FK_427785468fb7d2733f59e7d7d39` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `payments` ADD CONSTRAINT `FK_c5fa169d2de9407d99f2c6e4fab` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `lessons` ADD CONSTRAINT `FK_19261e484ffd22b40ea596ece4d` FOREIGN KEY (`section_id`) REFERENCES `sections`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `enrollments` ADD CONSTRAINT `FK_ff997f5a39cd24a491b9aca45c9` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `enrollments` ADD CONSTRAINT `FK_b79d0bf01779fdf9cfb6b092af3` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `enrollments_lessons` ADD CONSTRAINT `FK_8c1f7f99b8fd21076b8ae547bba` FOREIGN KEY (`enrollment_id`) REFERENCES `enrollments`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `enrollments_lessons` ADD CONSTRAINT `FK_a0b2d6a99bbb3ab51916259b3c1` FOREIGN KEY (`lesson_id`) REFERENCES `lessons`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `components` ADD CONSTRAINT `FK_1184609d2ce4aec53e82e051051` FOREIGN KEY (`lesson_id`) REFERENCES `lessons`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `comments` ADD CONSTRAINT `FK_0fe168752ce3bb4e7376d81f7ad` FOREIGN KEY (`review_id`) REFERENCES `reviews`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `comments` DROP FOREIGN KEY `FK_0fe168752ce3bb4e7376d81f7ad`');
    await queryRunner.query('ALTER TABLE `components` DROP FOREIGN KEY `FK_1184609d2ce4aec53e82e051051`');
    await queryRunner.query('ALTER TABLE `enrollments_lessons` DROP FOREIGN KEY `FK_a0b2d6a99bbb3ab51916259b3c1`');
    await queryRunner.query('ALTER TABLE `enrollments_lessons` DROP FOREIGN KEY `FK_8c1f7f99b8fd21076b8ae547bba`');
    await queryRunner.query('ALTER TABLE `enrollments` DROP FOREIGN KEY `FK_b79d0bf01779fdf9cfb6b092af3`');
    await queryRunner.query('ALTER TABLE `enrollments` DROP FOREIGN KEY `FK_ff997f5a39cd24a491b9aca45c9`');
    await queryRunner.query('ALTER TABLE `lessons` DROP FOREIGN KEY `FK_19261e484ffd22b40ea596ece4d`');
    await queryRunner.query('ALTER TABLE `payments` DROP FOREIGN KEY `FK_c5fa169d2de9407d99f2c6e4fab`');
    await queryRunner.query('ALTER TABLE `payments` DROP FOREIGN KEY `FK_427785468fb7d2733f59e7d7d39`');
    await queryRunner.query('ALTER TABLE `sections` DROP FOREIGN KEY `FK_53ccbd6e2fa20dac9062f4f4c36`');
    await queryRunner.query('ALTER TABLE `reviews` DROP FOREIGN KEY `FK_f99062f36181ab42863facfaea3`');
    await queryRunner.query('ALTER TABLE `reviews` DROP FOREIGN KEY `FK_728447781a30bc3fcfe5c2f1cdf`');
    await queryRunner.query('ALTER TABLE `courses` DROP FOREIGN KEY `FK_7722a465aa381126eb553158c73`');
    await queryRunner.query('DROP TABLE `comments`');
    await queryRunner.query('DROP TABLE `components`');
    await queryRunner.query('DROP TABLE `enrollments_lessons`');
    await queryRunner.query('DROP TABLE `enrollments`');
    await queryRunner.query('DROP TABLE `lessons`');
    await queryRunner.query('DROP TABLE `payments`');
    await queryRunner.query('DROP TABLE `sections`');
    await queryRunner.query('DROP TABLE `reviews`');
    await queryRunner.query('DROP TABLE `courses`');
    await queryRunner.query('DROP TABLE `users`');
  }

}
