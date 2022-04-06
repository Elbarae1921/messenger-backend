import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddPostsLikersJoinTable1633789936267 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
