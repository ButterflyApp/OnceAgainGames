import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeService } from './home.service';
import { OnceAgainGamesSharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent } from './';

@NgModule({
    imports: [
        OnceAgainGamesSharedModule,
        RouterModule.forRoot([ HOME_ROUTE ], { useHash: true })
    ],
    declarations: [
        HomeComponent,
    ],
    entryComponents: [
    ],
    providers: [
        HomeService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OnceAgainGamesHomeModule {}
