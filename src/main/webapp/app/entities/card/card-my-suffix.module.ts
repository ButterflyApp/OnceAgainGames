import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OnceAgainGamesSharedModule } from '../../shared';
import {
    CardMySuffixService,
    CardMySuffixPopupService,
    CardMySuffixComponent,
    CardMySuffixDetailComponent,
    CardMySuffixDialogComponent,
    CardMySuffixPopupComponent,
    CardMySuffixDeletePopupComponent,
    CardMySuffixDeleteDialogComponent,
    cardRoute,
    cardPopupRoute,
} from './';

const ENTITY_STATES = [
    ...cardRoute,
    ...cardPopupRoute,
];

@NgModule({
    imports: [
        OnceAgainGamesSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CardMySuffixComponent,
        CardMySuffixDetailComponent,
        CardMySuffixDialogComponent,
        CardMySuffixDeleteDialogComponent,
        CardMySuffixPopupComponent,
        CardMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        CardMySuffixComponent,
        CardMySuffixDialogComponent,
        CardMySuffixPopupComponent,
        CardMySuffixDeleteDialogComponent,
        CardMySuffixDeletePopupComponent,
    ],
    providers: [
        CardMySuffixService,
        CardMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OnceAgainGamesCardMySuffixModule {}
