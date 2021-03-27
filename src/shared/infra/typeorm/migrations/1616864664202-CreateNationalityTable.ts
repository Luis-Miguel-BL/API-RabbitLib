import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateNationalityTable1616864664202 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "nationality",
        columns: [
          {
            name: "id_nationality",
            type: "uuid",
            isPrimary: true,
            default: "uuid_generate_v4()",
          },
          { name: "description", type: "varchar", length: "255" },
          { name: "flag", type: "varchar", length: "255", isNullable: true },
          { name: "code", type: "int4", isNullable: true },
          { name: "created_at", type: "timestamptz", default: "now()" },
          { name: "updated_at", type: "timestamptz", default: "now()" },
          { name: "deleted_at", type: "timestamptz", isNullable: true },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("nationality");
  }
}
