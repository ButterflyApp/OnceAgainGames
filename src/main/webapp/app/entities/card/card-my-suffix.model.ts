import { BaseEntity } from './../../shared';

export class CardMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public symbol?: string,
        public colour?: string,
        public value?: string,
        public imageContentType?: string,
        public image?: any,
    ) {
    }
}
