import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { HomeService } from './home.service';
import { Account, LoginModalService, Principal } from '../shared';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.scss'
    ]

})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    // image1: string;
    gameIntros: any;
    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private homeService: HomeService
    ) {
        //  this.image1="../../content/images/one.PNG";
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }
    isState = false;
    isAuthenticated() {
        if (!this.isState && this.principal.isAuthenticated()) {
            this.getAllStates();
            this.isState = true;
        }
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }
    getAllStates() {

        this.homeService.viewStates().finally(() => {
           
       
         }).
           subscribe((res) => {
     
             this.gameIntros = res; console.log(res)
           }, (error) => console.log(error))
    }
}
