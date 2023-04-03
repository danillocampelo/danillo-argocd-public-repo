import {MigrationInterface, QueryRunner} from 'typeorm'

export class removeReservationDataColumnReservation1678995247629
  implements MigrationInterface
{
  name = 'removeReservationDataColumnReservation1678995247629'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reserve" DROP COLUMN "reservationData"`,
    )
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
    await queryRunner.query(
      `ALTER TABLE "reserve" ADD "reservationData" text NOT NULL`,
    )
  }
}
