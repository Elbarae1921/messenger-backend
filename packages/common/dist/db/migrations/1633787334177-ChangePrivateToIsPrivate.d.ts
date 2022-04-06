import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class ChangePrivateToIsPrivate1633787334177 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
