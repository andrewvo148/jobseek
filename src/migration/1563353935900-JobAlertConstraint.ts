import {MigrationInterface, QueryRunner} from "typeorm";

export class JobAlertConstraint1563353935900 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "job" ALTER COLUMN "salaryType" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "job" ALTER COLUMN "salaryType" SET NOT NULL`);
    }

}
