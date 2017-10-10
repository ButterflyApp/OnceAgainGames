import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { GameIntroMySuffix } from './game-intro-my-suffix.model';
import { GameIntroMySuffixPopupService } from './game-intro-my-suffix-popup.service';
import { GameIntroMySuffixService } from './game-intro-my-suffix.service';

@Component({
    selector: 'jhi-game-intro-my-suffix-delete-dialog',
    templateUrl: './game-intro-my-suffix-delete-dialog.component.html'
})
export class GameIntroMySuffixDeleteDialogComponent {

    gameIntro: GameIntroMySuffix;

    constructor(
        private gameIntroService: GameIntroMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.gameIntroService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'gameIntroListModification',
                content: 'Deleted an gameIntro'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-game-intro-my-suffix-delete-popup',
    template: ''
})
export class GameIntroMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private gameIntroPopupService: GameIntroMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.gameIntroPopupService
                .open(GameIntroMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
