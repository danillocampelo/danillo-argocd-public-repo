import {MigrationInterface, QueryRunner} from 'typeorm'

export class fixingPackageAndItemDetailsFields1676400224336
  implements MigrationInterface
{
  name = 'fixingPackageAndItemDetailsFields1676400224336'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "phone_verified" SET DEFAULT '0'`,
    )
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "accepted_regulation" SET DEFAULT '0'`,
    )
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "email_verified" SET DEFAULT '0'`,
    )
    await queryRunner.query(`ALTER TABLE "item_detail" DROP COLUMN "title"`)
    await queryRunner.query(`ALTER TABLE "item_detail" ADD "title" text`)
    await queryRunner.query(
      `ALTER TABLE "item_detail" DROP COLUMN "description"`,
    )
    await queryRunner.query(
      `ALTER TABLE "item_detail" ADD "description" text NOT NULL`,
    )
    await queryRunner.query(`ALTER TABLE "package" DROP COLUMN "title"`)
    await queryRunner.query(`ALTER TABLE "package" ADD "title" text`)
    await queryRunner.query(`ALTER TABLE "package" DROP COLUMN "subtitle"`)
    await queryRunner.query(`ALTER TABLE "package" ADD "subtitle" text`)
    await queryRunner.query(
      `ALTER TABLE "package" DROP COLUMN "itinerary_subtitle"`,
    )
    await queryRunner.query(
      `ALTER TABLE "package" ADD "itinerary_subtitle" text`,
    )
    await queryRunner.query(`ALTER TABLE "package" DROP COLUMN "catchphrase"`)
    await queryRunner.query(`ALTER TABLE "package" ADD "catchphrase" text`)
    await queryRunner.query(
      `ALTER TABLE "package" DROP COLUMN "external_description"`,
    )
    await queryRunner.query(
      `ALTER TABLE "package" ADD "external_description" text`,
    )
    await queryRunner.query(`ALTER TABLE "package" DROP COLUMN "destination"`)
    await queryRunner.query(`ALTER TABLE "package" ADD "destination" text`)
    await queryRunner.query(
      `ALTER TABLE "package" ALTER COLUMN "start_date" DROP NOT NULL`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "package" ALTER COLUMN "start_date" SET NOT NULL`,
    )
    await queryRunner.query(`ALTER TABLE "package" DROP COLUMN "destination"`)
    await queryRunner.query(
      `ALTER TABLE "package" ADD "destination" character varying(150)`,
    )
    await queryRunner.query(
      `ALTER TABLE "package" DROP COLUMN "external_description"`,
    )
    await queryRunner.query(
      `ALTER TABLE "package" ADD "external_description" character varying(255) NOT NULL`,
    )
    await queryRunner.query(`ALTER TABLE "package" DROP COLUMN "catchphrase"`)
    await queryRunner.query(
      `ALTER TABLE "package" ADD "catchphrase" character varying(150)`,
    )
    await queryRunner.query(
      `ALTER TABLE "package" DROP COLUMN "itinerary_subtitle"`,
    )
    await queryRunner.query(
      `ALTER TABLE "package" ADD "itinerary_subtitle" character varying(150)`,
    )
    await queryRunner.query(`ALTER TABLE "package" DROP COLUMN "subtitle"`)
    await queryRunner.query(
      `ALTER TABLE "package" ADD "subtitle" character varying(150) NOT NULL`,
    )
    await queryRunner.query(`ALTER TABLE "package" DROP COLUMN "title"`)
    await queryRunner.query(
      `ALTER TABLE "package" ADD "title" character varying NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "item_detail" DROP COLUMN "description"`,
    )
    await queryRunner.query(
      `ALTER TABLE "item_detail" ADD "description" character varying(150) NOT NULL`,
    )
    await queryRunner.query(`ALTER TABLE "item_detail" DROP COLUMN "title"`)
    await queryRunner.query(
      `ALTER TABLE "item_detail" ADD "title" character varying(150) NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "email_verified" SET DEFAULT false`,
    )
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "accepted_regulation" SET DEFAULT false`,
    )
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "phone_verified" SET DEFAULT false`,
    )
  }
}
