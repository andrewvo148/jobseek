import {MigrationInterface, QueryRunner} from "typeorm";

export class JobAddField1563353935809 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "job" ADD "topbenefit" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "job" ADD "description" text NOT NULL DEFAULT('')`);
        await queryRunner.query(`CREATE TYPE "job_incometype_enum" AS ENUM('gross', 'net')`);
        await queryRunner.query(`ALTER TABLE "job" ADD "incomeType" "job_incometype_enum" NOT NULL DEFAULT('gross')`);
        await queryRunner.query(`CREATE TYPE "job_salarytype_enum" AS ENUM('attractive', 'negotiation')`);
        await queryRunner.query(`ALTER TABLE "job" ADD "salaryType" "job_salarytype_enum" NOT NULL DEFAULT('negotiation')` );
        await queryRunner.query(`ALTER TABLE "job" DROP COLUMN "salaryMin"`);
        await queryRunner.query(`ALTER TABLE "job" ADD "salaryMin" numeric(11,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "job" DROP COLUMN "salaryMin"`);
        await queryRunner.query(`ALTER TABLE "job" ADD "salaryMin" integer`);
        await queryRunner.query(`ALTER TABLE "job" DROP COLUMN "salaryType"`);
        await queryRunner.query(`DROP TYPE "job_salarytype_enum"`);
        await queryRunner.query(`ALTER TABLE "job" DROP COLUMN "incomeType"`);
        await queryRunner.query(`DROP TYPE "job_incometype_enum"`);
        await queryRunner.query(`ALTER TABLE "job" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "job" DROP COLUMN "topbenefit"`);
    }

}
