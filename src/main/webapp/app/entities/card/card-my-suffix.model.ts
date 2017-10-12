import { BaseEntity } from './../../shared';

export class CardMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public type?: string,
        public value?: string,
        public imageContentType?: string,
        public image?: any,
    ) {
    }
}
