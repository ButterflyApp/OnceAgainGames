/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { OnceAgainGamesTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { CardMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/card/card-my-suffix-detail.component';
import { CardMySuffixService } from '../../../../../../main/webapp/app/entities/card/card-my-suffix.service';
import { CardMySuffix } from '../../../../../../main/webapp/app/entities/card/card-my-suffix.model';

describe('Component Tests', () => {

    describe('CardMySuffix Management Detail Component', () => {
        let comp: CardMySuffixDetailComponent;
        let fixture: ComponentFixture<CardMySuffixDetailComponent>;
        let service: CardMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [OnceAgainGamesTestModule],
                declarations: [CardMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    CardMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(CardMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CardMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CardMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new CardMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.card).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
