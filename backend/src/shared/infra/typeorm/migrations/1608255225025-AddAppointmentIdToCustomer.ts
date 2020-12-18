import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddAppointmentIdToCustomer1608255225025
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'customers',
      new TableColumn({
        name: 'appointment_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'customers',
      new TableForeignKey({
        name: 'AppointmentCustomer',
        columnNames: ['appointment_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'appointments',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('customers', 'AppointmentCustomer');
    await queryRunner.dropColumn('customers', 'appointment_id');
  }
}
