import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { GameIntroMySuffix } from './game-intro-my-suffix.model';
import { GameIntroMySuffixService } from './game-intro-my-suffix.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-game-intro-my-suffix',
    templateUrl: './game-intro-my-suffix.component.html'
})
export class GameIntroMySuffixComponent implements OnInit, OnDestroy {
gameIntros: GameIntroMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private gameIntroService: GameIntroMySuffixService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.gameIntroService.query().subscribe(
            (res: ResponseWrapper) => {
                this.gameIntros = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInGameIntros();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: GameIntroMySuffix) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    registerChangeInGameIntros() {
        this.eventSubscriber = this.eventManager.subscribe('gameIntroListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
