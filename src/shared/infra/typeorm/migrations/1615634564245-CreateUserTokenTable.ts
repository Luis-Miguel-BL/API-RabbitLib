import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTokenTable1615634564245 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user_token",
        columns: [
          {
            name: "id_user_token",
            type: "uuid",
            isPrimary: true,
            default: "uuid_generate_v4()",
          },
          { name: "id_user", type: "uuid" },
          { name: "token", type: "varchar", length: "6" },
          { name: "created_at", type: "timestamptz", default: "now()" },
        ],
        foreignKeys: [
          {
            name: "FKUser",
            referencedTableName: "user",
            referencedColumnNames: ["id_user"],
            columnNames: ["id_user"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user_token");
  }
}
