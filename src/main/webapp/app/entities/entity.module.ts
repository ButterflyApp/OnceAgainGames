import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { OnceAgainGamesGameIntroMySuffixModule } from './game-intro/game-intro-my-suffix.module';
import { OnceAgainGamesCardMySuffixModule } from './card/card-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        OnceAgainGamesGameIntroMySuffixModule,
        OnceAgainGamesCardMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OnceAgainGamesEntityModule {}
