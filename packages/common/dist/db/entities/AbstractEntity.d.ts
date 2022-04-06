import { BaseEntity } from 'typeorm';
export declare class AbstractEntity extends BaseEntity {
    constructor();
    id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    beforeInsert(): void;
    beforeUpdate(): void;
}
