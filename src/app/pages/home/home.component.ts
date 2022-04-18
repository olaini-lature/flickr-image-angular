import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { ConfirmationService } from 'app/services/confirmation.service';
import { ImageService } from 'app/services/image.service';
import { NetworkService } from 'app/services/network.service';
import { trim } from 'lodash';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

    skeletons = Array(10);

    isLoading = true;
    images: any;
    chunkImages: any;

    searchInputControl: FormControl = new FormControl();

    subRefreshImage: Subscription;

    currentPageIndex = -1;
    maxPageIndex = -1;

    constructor(
        private _imageService: ImageService,
        private _translocoService: TranslocoService,
        private _confirmationService: ConfirmationService,
        private _networkService: NetworkService
    ) {
        this.subRefreshImage = this._imageService.refreshImage.subscribe((refresh) => {
            if (refresh === true) {
                this.isLoading = true;
                this.images = undefined;
                this.chunkImages = undefined;
                this.getImages();
            }
        });
    }

    async ngOnInit(): Promise<any> {
        await this.getImages();
    }

    async ngOnDestroy(): Promise<any> {
        if (this.subRefreshImage) {
            this.subRefreshImage.unsubscribe();
        }
    }

    async getImages(): Promise<any> {
        const activeLang = this._translocoService.getActiveLang();

        this._networkService.isInternetConnectionAvailable().then(() => {
            this.isLoading = true;

            setTimeout(async () => {
                const searchValue = trim(this.searchInputControl.value);
                let query = '';

                if (searchValue.length > 0) {
                    query = '?tags=' + searchValue;
                }

                console.log('getImages query: ', query);
                await this._imageService.get(query).then(async (res) => {
                    console.log('getImages res: ', res);
                    this.images = JSON.parse(JSON.stringify(res));
                    console.log('getImages images: ', this.images);
                    this.chunkImages = res.items.splice(0, 10);
                    console.log('getImages chunkImages: ', this.chunkImages);

                    const modulo = this.images.items.length % 10;
                    const main = Math.floor(this.images.items.length / 10);
                    if (modulo > 0) {
                        this.maxPageIndex = main;
                    } else {
                        this.maxPageIndex = main - 1;
                    }

                    this.currentPageIndex = 0;

                }).catch((err) => {
                    console.log('getImages err: ', err);

                    this.images = 'error';

                    this._confirmationService.getError(err.error.message);
                }).finally(() => {
                    this.isLoading = false;
                    this._imageService.refreshImage.next(false);
                });
            }, 800);
        }).catch((err) => {
            this._confirmationService.showErrorConnection(activeLang);
            this._imageService.refreshImage.next(false);
        });
    }

    async getNextImages(): Promise<any> {
        this.currentPageIndex++;
        const images = JSON.parse(JSON.stringify(this.images));
        this.chunkImages = images.items.splice(this.currentPageIndex * 10, 10);
    }
    async getPreviousImages(): Promise<any> {
        this.currentPageIndex--;
        const images = JSON.parse(JSON.stringify(this.images));
        this.chunkImages = images.items.splice(this.currentPageIndex * 10, 10);
    }

    async searchChanged(): Promise<any> {
        this.images = undefined;
        this.isLoading = true;
        await this.getImages();
    }

}
