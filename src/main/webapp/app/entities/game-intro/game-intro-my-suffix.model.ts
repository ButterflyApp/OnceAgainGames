import { BaseEntity } from './../../shared';

export class GameIntroMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public wallpaperContentType?: string,
        public wallpaper?: any,
    ) {
    }
}
