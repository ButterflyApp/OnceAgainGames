import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OnceAgainGamesSharedModule } from '../../shared';
import {
    GameIntroMySuffixService,
    GameIntroMySuffixPopupService,
    GameIntroMySuffixComponent,
    GameIntroMySuffixDetailComponent,
    GameIntroMySuffixDialogComponent,
    GameIntroMySuffixPopupComponent,
    GameIntroMySuffixDeletePopupComponent,
    GameIntroMySuffixDeleteDialogComponent,
    gameIntroRoute,
    gameIntroPopupRoute,
} from './';

const ENTITY_STATES = [
    ...gameIntroRoute,
    ...gameIntroPopupRoute,
];

@NgModule({
    imports: [
        OnceAgainGamesSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        GameIntroMySuffixComponent,
        GameIntroMySuffixDetailComponent,
        GameIntroMySuffixDialogComponent,
        GameIntroMySuffixDeleteDialogComponent,
        GameIntroMySuffixPopupComponent,
        GameIntroMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        GameIntroMySuffixComponent,
        GameIntroMySuffixDialogComponent,
        GameIntroMySuffixPopupComponent,
        GameIntroMySuffixDeleteDialogComponent,
        GameIntroMySuffixDeletePopupComponent,
    ],
    providers: [
        GameIntroMySuffixService,
        GameIntroMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OnceAgainGamesGameIntroMySuffixModule {}
