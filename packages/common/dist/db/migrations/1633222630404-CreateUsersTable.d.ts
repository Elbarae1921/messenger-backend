import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class CreateUsersTable1633222630404 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
