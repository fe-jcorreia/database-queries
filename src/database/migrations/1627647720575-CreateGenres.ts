import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateGenres1627647720575 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "genres" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "genre" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_714b25e83134780fa597dedc655fac9b" PRIMARY KEY ("id"))'
    );
    await queryRunner.query(
      'CREATE TABLE "games_genres_genres" ("gamesId" uuid NOT NULL, "genresId" uuid NOT NULL, CONSTRAINT "PK_115be081a4f8f78110fe4a47a4d7aed5" PRIMARY KEY ("gamesId", "genresId"))'
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_bf149a813623c4b028d5515c9c0cf834" ON "games_genres_genres" ("gamesId") '
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_3724f0601480dc7a4eab5677242ce2b0" ON "games_genres_genres" ("genresId")'
    );
    await queryRunner.query(
      'ALTER TABLE "games_genres_genres" ADD CONSTRAINT "FK_57ab8784528cf5e4e150c77a2950d932" FOREIGN KEY ("gamesId") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE NO ACTION'
    );
    await queryRunner.query(
      'ALTER TABLE "games_genres_genres" ADD CONSTRAINT "FK_f3528002f8fb367bc812c05676188871" FOREIGN KEY ("genresId") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE NO ACTION'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "games_genres_genres" DROP CONSTRAINT "FK_57ab8784528cf5e4e150c77a2950d932"'
    );
    await queryRunner.query(
      'ALTER TABLE "games_genres_genres" DROP CONSTRAINT "FK_f3528002f8fb367bc812c05676188871"'
    );
    await queryRunner.query(
      'DROP INDEX "IDX_bf149a813623c4b028d5515c9c0cf834"'
    );
    await queryRunner.query(
      'DROP INDEX "IDX_3724f0601480dc7a4eab5677242ce2b0"'
    );
    await queryRunner.query('DROP TABLE "games_genres_genres"');
    await queryRunner.query('DROP TABLE "genres"');
  }
}
