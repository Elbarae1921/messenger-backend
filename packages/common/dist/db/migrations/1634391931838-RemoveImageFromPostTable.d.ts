import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class RemoveImageFromPostTable1634391931838 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
