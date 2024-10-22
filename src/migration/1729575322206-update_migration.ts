import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateMigration1729575322206 implements MigrationInterface {
    name = 'UpdateMigration1729575322206'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`lessons\` DROP FOREIGN KEY \`FK_19261e484ffd22b40ea596ece4d\``);
        await queryRunner.query(`CREATE TABLE \`categories\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`phone_number\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`avatar\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`date_of_birth\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`gender\` enum ('male', 'female', 'other') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`address\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`identity_card\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`additional_info\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`courses\` ADD \`category_id\` bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`lessons\` CHANGE \`progress\` \`progress\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`enrollments\` CHANGE \`completion_date\` \`completion_date\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`lessons\` ADD CONSTRAINT \`FK_19261e484ffd22b40ea596ece4d\` FOREIGN KEY (\`section_id\`) REFERENCES \`sections\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`courses\` ADD CONSTRAINT \`FK_e4c260fe6bb1131707c4617f745\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`courses\` DROP FOREIGN KEY \`FK_e4c260fe6bb1131707c4617f745\``);
        await queryRunner.query(`ALTER TABLE \`lessons\` DROP FOREIGN KEY \`FK_19261e484ffd22b40ea596ece4d\``);
        await queryRunner.query(`ALTER TABLE \`enrollments\` CHANGE \`completion_date\` \`completion_date\` datetime NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`lessons\` CHANGE \`progress\` \`progress\` int NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`courses\` DROP COLUMN \`category_id\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`additional_info\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`identity_card\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`address\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`gender\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`date_of_birth\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`avatar\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`phone_number\``);
        await queryRunner.query(`DROP TABLE \`categories\``);
        await queryRunner.query(`ALTER TABLE \`lessons\` ADD CONSTRAINT \`FK_19261e484ffd22b40ea596ece4d\` FOREIGN KEY (\`section_id\`) REFERENCES \`sections\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
