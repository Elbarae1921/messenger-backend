import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddImageToUserTable1633965682590 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
