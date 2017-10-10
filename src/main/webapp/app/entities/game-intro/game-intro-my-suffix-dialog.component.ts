import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { GameIntroMySuffix } from './game-intro-my-suffix.model';
import { GameIntroMySuffixPopupService } from './game-intro-my-suffix-popup.service';
import { GameIntroMySuffixService } from './game-intro-my-suffix.service';

@Component({
    selector: 'jhi-game-intro-my-suffix-dialog',
    templateUrl: './game-intro-my-suffix-dialog.component.html'
})
export class GameIntroMySuffixDialogComponent implements OnInit {

    gameIntro: GameIntroMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private gameIntroService: GameIntroMySuffixService,
        private elementRef: ElementRef,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.gameIntro, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.gameIntro.id !== undefined) {
            this.subscribeToSaveResponse(
                this.gameIntroService.update(this.gameIntro));
        } else {
            this.subscribeToSaveResponse(
                this.gameIntroService.create(this.gameIntro));
        }
    }

    private subscribeToSaveResponse(result: Observable<GameIntroMySuffix>) {
        result.subscribe((res: GameIntroMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: GameIntroMySuffix) {
        this.eventManager.broadcast({ name: 'gameIntroListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-game-intro-my-suffix-popup',
    template: ''
})
export class GameIntroMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private gameIntroPopupService: GameIntroMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.gameIntroPopupService
                    .open(GameIntroMySuffixDialogComponent as Component, params['id']);
            } else {
                this.gameIntroPopupService
                    .open(GameIntroMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
