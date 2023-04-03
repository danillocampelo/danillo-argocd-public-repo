import {MigrationInterface, QueryRunner} from 'typeorm'

export class reserveEntity1677256456769 implements MigrationInterface {
  name = 'reserveEntity1677256456769'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "reserve" ("reservationData" text NOT NULL, "member_code" character varying NOT NULL, "session_id" character varying NOT NULL, "user_email" character varying(150) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_69e1e7d6672f30e4348ef3a5288" UNIQUE ("member_code", "session_id"), CONSTRAINT "PK_69e1e7d6672f30e4348ef3a5288" PRIMARY KEY ("member_code", "session_id"))`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "reserve"`)
  }
}
