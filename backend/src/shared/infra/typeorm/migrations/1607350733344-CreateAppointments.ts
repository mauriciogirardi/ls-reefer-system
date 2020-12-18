import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAppointments1607350733344
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'date',
            type: 'timestamp with time zone',
          },
          {
            name: 'customer',
            type: 'varchar',
          },
          {
            name: 'technician',
            type: 'varchar',
          },
          {
            name: 'typeService',
            type: 'varchar',
          },
          {
            name: 'device',
            type: 'varchar',
          },
          {
            name: 'btus',
            type: 'int',
          },
          {
            name: 'quantity',
            type: 'int',
          },
          {
            name: 'electric',
            type: 'varchar',
          },
          {
            name: 'price',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'placeOfService',
            type: 'varchar',
          },
          {
            name: 'placeOfInstallation',
            type: 'varchar',
          },
          {
            name: 'obs',
            type: 'varchar',
          },
          {
            name: 'status',
            type: 'boolean',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments');
  }
}
