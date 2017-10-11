import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CardMySuffixComponent } from './card-my-suffix.component';
import { CardMySuffixDetailComponent } from './card-my-suffix-detail.component';
import { CardMySuffixPopupComponent } from './card-my-suffix-dialog.component';
import { CardMySuffixDeletePopupComponent } from './card-my-suffix-delete-dialog.component';

export const cardRoute: Routes = [
    {
        path: 'card-my-suffix',
        component: CardMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'onceAgainGamesApp.card.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'card-my-suffix/:id',
        component: CardMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'onceAgainGamesApp.card.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cardPopupRoute: Routes = [
    {
        path: 'card-my-suffix-new',
        component: CardMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'onceAgainGamesApp.card.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'card-my-suffix/:id/edit',
        component: CardMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'onceAgainGamesApp.card.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'card-my-suffix/:id/delete',
        component: CardMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'onceAgainGamesApp.card.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
