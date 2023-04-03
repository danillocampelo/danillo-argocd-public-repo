import {MigrationInterface, QueryRunner} from 'typeorm'

export class userCategoryclear1678125167820 implements MigrationInterface {
  name = 'userCategoryclear1678125167820'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_category" ("id" SERIAL NOT NULL, "category" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c22adcb15e7de70e1a74b4a3542" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "reserve" ADD CONSTRAINT "UQ_69e1e7d6672f30e4348ef3a5288" UNIQUE ("member_code", "session_id")`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reserve" DROP CONSTRAINT "UQ_69e1e7d6672f30e4348ef3a5288"`,
    )
    await queryRunner.query(`DROP TABLE "user_category"`)
  }
}
