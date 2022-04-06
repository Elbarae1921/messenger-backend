import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddFriendRequestsAndFriends1633812065954 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
