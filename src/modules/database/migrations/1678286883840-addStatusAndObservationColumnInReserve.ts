import {MigrationInterface, QueryRunner} from 'typeorm'

export class addStatusAndObservationColumnInReserve1678286883840
  implements MigrationInterface
{
  name = 'addStatusAndObservationColumnInReserve1678286883840'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "booking" ("id" SERIAL NOT NULL, "infotravelId" integer NOT NULL, "status" character varying NOT NULL, CONSTRAINT "UQ_514cc39ff4aa5c5f878f8408ec6" UNIQUE ("infotravelId"), CONSTRAINT "PK_49171efc69702ed84c812f33540" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "reserve" ADD "bookingId" character varying(10) NOT NULL`,
    )
    await queryRunner.query(
      `CREATE TYPE "public"."reserve_status_enum" AS ENUM('1', '2', '3')`,
    )
    await queryRunner.query(
      `ALTER TABLE "reserve" ADD "status" "public"."reserve_status_enum" NOT NULL`,
    )
    await queryRunner.query(`ALTER TABLE "reserve" ADD "observation" text`)
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "phone_verified" SET DEFAULT '0'`,
    )
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "accepted_regulation" SET DEFAULT '0'`,
    )
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "email_verified" SET DEFAULT '0'`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "email_verified" SET DEFAULT false`,
    )
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "accepted_regulation" SET DEFAULT false`,
    )
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "phone_verified" SET DEFAULT false`,
    )
    await queryRunner.query(`ALTER TABLE "reserve" DROP COLUMN "observation"`)
    await queryRunner.query(`ALTER TABLE "reserve" DROP COLUMN "status"`)
    await queryRunner.query(`DROP TYPE "public"."reserve_status_enum"`)
    await queryRunner.query(`ALTER TABLE "reserve" DROP COLUMN "bookingId"`)
    await queryRunner.query(`DROP TABLE "booking"`)
  }
}
