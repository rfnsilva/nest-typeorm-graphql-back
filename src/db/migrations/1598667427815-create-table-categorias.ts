import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createTableCategorias1598667427815 implements MigrationInterface {
    private table = new Table({
      name: 'categorias',
      columns: [
        {
          name: 'id',
          type: 'integer',
          isPrimary: true,
          isGenerated: true, // Auto-increment
          generationStrategy: 'increment',
        },
        {
          name: 'nome',
          type: 'varchar',
          length: '255',
          isNullable: false,
        },
        {
          name: 'created_at',
          type: 'timestamptz',
          isNullable: false,
          default: 'now()',
        },
        {
          name: 'updated_at',
          type: 'timestamptz',
          isNullable: false,
          default: 'now()',
        },
      ],
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(this.table);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.table);
    }

}
