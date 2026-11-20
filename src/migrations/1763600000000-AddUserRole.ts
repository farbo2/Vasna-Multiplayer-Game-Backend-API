import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddUserRole1763600000000 implements MigrationInterface {
  name = 'AddUserRole1763600000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('user');
    if (table && !table.findColumnByName('role')) {
      await queryRunner.addColumn('user', new TableColumn({
        name: 'role',
        type: 'varchar',
        length: '255',
        isNullable: false,
        default: "'user'",
      }));
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('user');
    if (table?.findColumnByName('role')) await queryRunner.dropColumn('user', 'role');
  }
}
