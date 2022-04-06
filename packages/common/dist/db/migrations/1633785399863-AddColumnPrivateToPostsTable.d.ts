import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddColumnPrivateToPostsTable1633785399863 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
