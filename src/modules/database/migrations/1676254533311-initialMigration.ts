import {MigrationInterface, QueryRunner} from 'typeorm'

export class initialMigration1676254533311 implements MigrationInterface {
  name = 'initialMigration1676254533311'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "address" ("id" SERIAL NOT NULL, "zipcode" character varying(30) NOT NULL, "address" character varying(150) NOT NULL, "number" character varying(50) NOT NULL, "complement" character varying(150), "neighborhood" character varying(50) NOT NULL, "city" character varying(50) NOT NULL, "state" character varying(20) NOT NULL, "country" character varying(20) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "userId" integer, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TYPE "public"."user_user_type_enum" AS ENUM('admin', 'user')`,
    )
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying(150) NOT NULL, "first_name" character varying(150) NOT NULL, "last_name" character varying(150) NOT NULL, "birthdate" TIMESTAMP, "phone" character varying(20), "phone_verified" boolean NOT NULL DEFAULT '0', "password" character varying(150), "accepted_regulation" boolean NOT NULL DEFAULT '0', "email_verified" boolean NOT NULL DEFAULT '0', "user_type" "public"."user_user_type_enum" NOT NULL DEFAULT 'user', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "document" ("id" SERIAL NOT NULL, "document" character varying(150) NOT NULL, "type" character varying(150) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "userId" integer, CONSTRAINT "UQ_c8833daea5832954ffa0bd91052" UNIQUE ("document"), CONSTRAINT "PK_e57d3357f83f3cdc0acffc3d777" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "experience" ("id" SERIAL NOT NULL, "name" character varying(150) NOT NULL, "description" character varying(255), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5e8d5a534100e1b17ee2efa429a" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TYPE "public"."item_detail_type_enum" AS ENUM('1', '2', '3', '4')`,
    )
    await queryRunner.query(
      `CREATE TABLE "item_detail" ("id" SERIAL NOT NULL, "icon" character varying(150), "type" "public"."item_detail_type_enum", "title" character varying(150) NOT NULL, "description" character varying(150) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "packageId" integer, CONSTRAINT "PK_864d3cb5dd8bc67512e2a533d9b" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "trivia" ("id" SERIAL NOT NULL, "text" character varying(150) NOT NULL, "bold_text" character varying(150) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "packageId" integer, CONSTRAINT "PK_faf9ea23fdea1723297b3e92c1a" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TYPE "public"."package_status_enum" AS ENUM('active', 'disabled')`,
    )
    await queryRunner.query(
      `CREATE TABLE "package" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "subtitle" character varying(150) NOT NULL, "itinerary_subtitle" character varying(150), "description" text, "catchphrase" character varying(150), "catchphrase_icon" character varying(150), "highlight" boolean NOT NULL DEFAULT false, "external_description" character varying(255) NOT NULL, "external_id" character varying(150), "destination" character varying(150), "destination_type" character varying(150), "occupancy" character varying(150), "start_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP, "status" "public"."package_status_enum" NOT NULL DEFAULT 'active', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_3185917c1851a129cf0c58db95e" UNIQUE ("external_id"), CONSTRAINT "PK_308364c66df656295bc4ec467c2" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "parameters" ("id" SERIAL NOT NULL, "key" character varying(150) NOT NULL, "value" character varying(150) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "partnerIdId" integer, CONSTRAINT "PK_6b03a26baa3161f87fa87588859" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "partner" ("id" SERIAL NOT NULL, "name" character varying(150), "id_provider" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8f34ff11ddd5459eacbfacd48ca" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "package_experiences_experience" ("packageId" integer NOT NULL, "experienceId" integer NOT NULL, CONSTRAINT "PK_45ac15afe35f132f036f4766d3e" PRIMARY KEY ("packageId", "experienceId"))`,
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_66fa101f8901f1d0a89caf112d" ON "package_experiences_experience" ("packageId") `,
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_a8460fb0e93cb14c755bfc39dd" ON "package_experiences_experience" ("experienceId") `,
    )
    await queryRunner.query(
      `ALTER TABLE "address" ADD CONSTRAINT "FK_d25f1ea79e282cc8a42bd616aa3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "document" ADD CONSTRAINT "FK_7424ddcbdf1e9b067669eb0d3fd" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "item_detail" ADD CONSTRAINT "FK_2162817548b9d5f6927b8d0f9aa" FOREIGN KEY ("packageId") REFERENCES "package"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "trivia" ADD CONSTRAINT "FK_bb142a78cbe786325bf0209bcfd" FOREIGN KEY ("packageId") REFERENCES "package"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "parameters" ADD CONSTRAINT "FK_c289fc7ef799b0376beab985fcb" FOREIGN KEY ("partnerIdId") REFERENCES "partner"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "package_experiences_experience" ADD CONSTRAINT "FK_66fa101f8901f1d0a89caf112d8" FOREIGN KEY ("packageId") REFERENCES "package"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE "package_experiences_experience" ADD CONSTRAINT "FK_a8460fb0e93cb14c755bfc39dd6" FOREIGN KEY ("experienceId") REFERENCES "experience"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "package_experiences_experience" DROP CONSTRAINT "FK_a8460fb0e93cb14c755bfc39dd6"`,
    )
    await queryRunner.query(
      `ALTER TABLE "package_experiences_experience" DROP CONSTRAINT "FK_66fa101f8901f1d0a89caf112d8"`,
    )
    await queryRunner.query(
      `ALTER TABLE "parameters" DROP CONSTRAINT "FK_c289fc7ef799b0376beab985fcb"`,
    )
    await queryRunner.query(
      `ALTER TABLE "trivia" DROP CONSTRAINT "FK_bb142a78cbe786325bf0209bcfd"`,
    )
    await queryRunner.query(
      `ALTER TABLE "item_detail" DROP CONSTRAINT "FK_2162817548b9d5f6927b8d0f9aa"`,
    )
    await queryRunner.query(
      `ALTER TABLE "document" DROP CONSTRAINT "FK_7424ddcbdf1e9b067669eb0d3fd"`,
    )
    await queryRunner.query(
      `ALTER TABLE "address" DROP CONSTRAINT "FK_d25f1ea79e282cc8a42bd616aa3"`,
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a8460fb0e93cb14c755bfc39dd"`,
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_66fa101f8901f1d0a89caf112d"`,
    )
    await queryRunner.query(`DROP TABLE "package_experiences_experience"`)
    await queryRunner.query(`DROP TABLE "partner"`)
    await queryRunner.query(`DROP TABLE "parameters"`)
    await queryRunner.query(`DROP TABLE "package"`)
    await queryRunner.query(`DROP TYPE "public"."package_status_enum"`)
    await queryRunner.query(`DROP TABLE "trivia"`)
    await queryRunner.query(`DROP TABLE "item_detail"`)
    await queryRunner.query(`DROP TYPE "public"."item_detail_type_enum"`)
    await queryRunner.query(`DROP TABLE "experience"`)
    await queryRunner.query(`DROP TABLE "document"`)
    await queryRunner.query(`DROP TABLE "user"`)
    await queryRunner.query(`DROP TYPE "public"."user_user_type_enum"`)
    await queryRunner.query(`DROP TABLE "address"`)
  }
}
