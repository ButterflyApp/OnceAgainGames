import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { GameIntroMySuffixComponent } from './game-intro-my-suffix.component';
import { GameIntroMySuffixDetailComponent } from './game-intro-my-suffix-detail.component';
import { GameIntroMySuffixPopupComponent } from './game-intro-my-suffix-dialog.component';
import { GameIntroMySuffixDeletePopupComponent } from './game-intro-my-suffix-delete-dialog.component';

export const gameIntroRoute: Routes = [
    {
        path: 'game-intro-my-suffix',
        component: GameIntroMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'onceAgainGamesApp.gameIntro.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'game-intro-my-suffix/:id',
        component: GameIntroMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'onceAgainGamesApp.gameIntro.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const gameIntroPopupRoute: Routes = [
    {
        path: 'game-intro-my-suffix-new',
        component: GameIntroMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'onceAgainGamesApp.gameIntro.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'game-intro-my-suffix/:id/edit',
        component: GameIntroMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'onceAgainGamesApp.gameIntro.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'game-intro-my-suffix/:id/delete',
        component: GameIntroMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'onceAgainGamesApp.gameIntro.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
