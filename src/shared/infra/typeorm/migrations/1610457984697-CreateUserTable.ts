import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTable1610457984697 implements MigrationInterface {
  name = "CreateUserTable1610457984697";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user",
        columns: [
          {
            name: "id_user",
            type: "uuid",
            isPrimary: true,
            default: "uuid_generate_v4()",
          },
          { name: "name", type: "varchar", length: "255" },
          { name: "email", type: "varchar", length: "100" },
          {
            name: "password",
            type: "varchar",
            length: "255",
            isNullable: true,
          },
          { name: "permissions", type: "varchar", isArray: true },
          { name: "date_birth", type: "date", isNullable: true },
          { name: "created_at", type: "timestamptz", default: "now()" },
          { name: "updated_at", type: "timestamptz", default: "now()" },
          { name: "deleted_at", type: "timestamptz", isNullable: true },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user");
  }
}
