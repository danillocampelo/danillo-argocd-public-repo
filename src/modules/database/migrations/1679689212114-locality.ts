import {MigrationInterface, QueryRunner} from 'typeorm'

export class locality1679689212114 implements MigrationInterface {
  name = 'locality1679689212114'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "locality" ("id" SERIAL NOT NULL, "external_id" text NOT NULL, "name" text NOT NULL, "normalized_name" text NOT NULL, CONSTRAINT "PK_c0445d9b8706ac2d31be91c9b6b" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_ad441057d29a58a0050e8ded06" ON "locality" ("normalized_name") `,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ad441057d29a58a0050e8ded06"`,
    )
    await queryRunner.query(`DROP TABLE "locality"`)
  }
}
