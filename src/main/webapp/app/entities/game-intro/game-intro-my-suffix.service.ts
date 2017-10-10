import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { GameIntroMySuffix } from './game-intro-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class GameIntroMySuffixService {

    private resourceUrl = SERVER_API_URL + 'api/game-intros';

    constructor(private http: Http) { }

    create(gameIntro: GameIntroMySuffix): Observable<GameIntroMySuffix> {
        const copy = this.convert(gameIntro);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(gameIntro: GameIntroMySuffix): Observable<GameIntroMySuffix> {
        const copy = this.convert(gameIntro);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<GameIntroMySuffix> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to GameIntroMySuffix.
     */
    private convertItemFromServer(json: any): GameIntroMySuffix {
        const entity: GameIntroMySuffix = Object.assign(new GameIntroMySuffix(), json);
        return entity;
    }

    /**
     * Convert a GameIntroMySuffix to a JSON which can be sent to the server.
     */
    private convert(gameIntro: GameIntroMySuffix): GameIntroMySuffix {
        const copy: GameIntroMySuffix = Object.assign({}, gameIntro);
        return copy;
    }
}
