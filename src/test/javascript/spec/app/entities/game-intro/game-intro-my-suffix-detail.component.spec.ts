/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { OnceAgainGamesTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { GameIntroMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/game-intro/game-intro-my-suffix-detail.component';
import { GameIntroMySuffixService } from '../../../../../../main/webapp/app/entities/game-intro/game-intro-my-suffix.service';
import { GameIntroMySuffix } from '../../../../../../main/webapp/app/entities/game-intro/game-intro-my-suffix.model';

describe('Component Tests', () => {

    describe('GameIntroMySuffix Management Detail Component', () => {
        let comp: GameIntroMySuffixDetailComponent;
        let fixture: ComponentFixture<GameIntroMySuffixDetailComponent>;
        let service: GameIntroMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [OnceAgainGamesTestModule],
                declarations: [GameIntroMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    GameIntroMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(GameIntroMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GameIntroMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GameIntroMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new GameIntroMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.gameIntro).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
