import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterCustomerFieldToCostomerId1607351329200
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'customer');
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'customer_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'CustomerAppointment',
        columnNames: ['customer_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'customers',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'CustomerAppointment');
    await queryRunner.dropColumn('appointments', 'customer_id');
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'customer',
        type: 'varchar',
      }),
    );
  }
}
