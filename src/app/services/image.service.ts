import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CONSTANTS } from './config.service';
import { RestHiWorkService } from './rest.service';

const IMAGE_URL = CONSTANTS.API_FLICKR_BACKEND + 'images';

@Injectable({
    providedIn: 'root',
})
export class ImageService {
    onImageChange = new BehaviorSubject<any>('');
    images = new BehaviorSubject<any>('');
    selectedImage = new BehaviorSubject<any>(null);
    paginationImage = new BehaviorSubject<any>(null);
    refreshImage = new BehaviorSubject<any>(false);

    constructor(public _restService: RestHiWorkService) {
        this._restService = _restService;
    }

    get(query): any {
        return new Promise<any>(async (resolve, reject) => {
            this.getAPI(query)
                .toPromise()
                .then((result) => {
                    this.images.next(result);
                    resolve(result);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    private getAPI(query): Observable<any> {
        if (query !== '') {
            return this._restService.get(IMAGE_URL + query);
        } else {
            return this._restService.get(IMAGE_URL);
        }
    }
}
