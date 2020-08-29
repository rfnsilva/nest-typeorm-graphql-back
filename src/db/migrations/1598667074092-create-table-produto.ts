import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createTableProduto1598667074092 implements MigrationInterface {
    private table = new Table({
      name: 'produtos',
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
          name: 'descricao',
          type: 'varchar',
          length: '255',
          isNullable: false,
        },
        {
          name: 'valor',
          type: 'integer',
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
        {
          name: 'categoria_id',
          type: 'integer',
          isNullable: false,
        },
      ],
    });

    private foreignKey = new TableForeignKey({
      columnNames: ['categoria_id'],
      referencedColumnNames: ['id'],
      onDelete: 'CASCADE',
      referencedTableName: 'categorias',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(this.table);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.table);
    }

}
