import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { GameIntroMySuffix } from './game-intro-my-suffix.model';
import { GameIntroMySuffixService } from './game-intro-my-suffix.service';

@Component({
    selector: 'jhi-game-intro-my-suffix-detail',
    templateUrl: './game-intro-my-suffix-detail.component.html'
})
export class GameIntroMySuffixDetailComponent implements OnInit, OnDestroy {

    gameIntro: GameIntroMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private gameIntroService: GameIntroMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInGameIntros();
    }

    load(id) {
        this.gameIntroService.find(id).subscribe((gameIntro) => {
            this.gameIntro = gameIntro;
        });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInGameIntros() {
        this.eventSubscriber = this.eventManager.subscribe(
            'gameIntroListModification',
            (response) => this.load(this.gameIntro.id)
        );
    }
}
