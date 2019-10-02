import {MigrationInterface, QueryRunner} from "typeorm";

export class CompanyUpdate1563264021289 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        // await queryRunner.query(`ALTER TABLE "company" ADD "street" character varying(255) NOT NULL DEFAULT('')`);
        // await queryRunner.query(`ALTER TABLE "company" ADD "provinceId" integer`);
        // await queryRunner.query(`ALTER TABLE "company" ADD "districtId" integer`);
        // await queryRunner.query(`ALTER TABLE "company" ADD "wardId" integer`);
        // await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_07da4777a3a0108df39f79a8440" FOREIGN KEY ("provinceId") REFERENCES "province"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        // await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_9a66685fb0bc2cee8b72e660c24" FOREIGN KEY ("districtId") REFERENCES "district"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        // await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_eeb40fc6cdaadb437e7ddfa2caf" FOREIGN KEY ("wardId") REFERENCES "ward"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_eeb40fc6cdaadb437e7ddfa2caf"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_9a66685fb0bc2cee8b72e660c24"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_07da4777a3a0108df39f79a8440"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "wardId"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "districtId"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "provinceId"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "street"`);
    }

}
