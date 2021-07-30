import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrders1627648329059 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "total" decimal NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_324c6de94756d814257bb59bc23d57b7" PRIMARY KEY ("id"))'
    );
    await queryRunner.query(
      'CREATE TABLE "order_game_game" ("orderId" uuid NOT NULL, "gameId" uuid NOT NULL, CONSTRAINT "PK_5e876e7f778dc9ac81a8ac0bbc6a4372" PRIMARY KEY ("orderId", "gameId"))'
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_61683d6202e24fd925f5cce7dbe862c5" ON "order_game_game" ("orderId") '
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_aea5dd338968117fe1db24226da26601" ON "order_game_game" ("gameId") '
    );
    await queryRunner.query(
      'ALTER TABLE "order_game_game" ADD CONSTRAINT "FK_3065f9ebca5fda1371e722d2c0b6ab54" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION'
    );
    await queryRunner.query(
      'ALTER TABLE "order_game_game" ADD CONSTRAINT "FK_d999e908663fdc1431063dca22ddca6d" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE NO ACTION'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "order_game_game" DROP CONSTRAINT "FK_3065f9ebca5fda1371e722d2c0b6ab54"'
    );
    await queryRunner.query(
      'ALTER TABLE "order_game_game" DROP CONSTRAINT "FK_d999e908663fdc1431063dca22ddca6d"'
    );
    await queryRunner.query(
      'DROP INDEX "IDX_61683d6202e24fd925f5cce7dbe862c5"'
    );
    await queryRunner.query(
      'DROP INDEX "IDX_aea5dd338968117fe1db24226da26601"'
    );
    await queryRunner.query('DROP TABLE "order_game_game"');
    await queryRunner.query('DROP TABLE "orders"');
  }
}
