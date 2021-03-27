import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAuthorTable1616864873821 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "author",
        columns: [
          {
            name: "id_author",
            type: "uuid",
            isPrimary: true,
            default: "uuid_generate_v4()",
          },
          { name: "id_nationality", type: "uuid" },
          { name: "name", type: "varchar", length: "255" },
          { name: "description", type: "varchar", length: "500" },
          { name: "created_at", type: "timestamptz", default: "now()" },
          { name: "updated_at", type: "timestamptz", default: "now()" },
          { name: "deleted_at", type: "timestamptz", isNullable: true },
        ],
        foreignKeys: [
          {
            name: "FKNationality",
            referencedTableName: "nationality",
            referencedColumnNames: ["id_nationality"],
            columnNames: ["id_nationality"],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("author");
  }
}
