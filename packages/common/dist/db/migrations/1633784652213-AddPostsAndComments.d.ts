import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddPostsAndComments1633784652213 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
