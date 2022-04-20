import { Component, OnDestroy, OnInit, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { ConfirmationService } from 'app/services/confirmation.service';
import { ImageService } from 'app/services/image.service';
import { NetworkService } from 'app/services/network.service';
import { trim } from 'lodash';
import { Subscription } from 'rxjs';
import { ImagePreviewService } from 'app/services/image-preview.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
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

    searchTimeout: any;

    constructor(
        private _imageService: ImageService,
        private _translocoService: TranslocoService,
        private _confirmationService: ConfirmationService,
        private _networkService: NetworkService,
        private _imagePreviewService: ImagePreviewService
    ) {
        this.subRefreshImage = this._imageService.refreshImage.subscribe(
            (refresh) => {
                if (refresh === true) {
                    this.isLoading = true;
                    this.images = undefined;
                    this.chunkImages = undefined;
                    this.getImages();
                }
            }
        );
    }

    @HostListener('window:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent): any {
        const charCode = event.which ? event.which : event.keyCode;

        if (charCode === 37) {
            // left
            if (this.currentPageIndex !== 0) {
                this.getPreviousImages();
            }
        } else if (charCode === 39) {
            // right
            if (this.currentPageIndex !== this.maxPageIndex) {
                this.getNextImages();
            }
        }
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

        this._networkService
            .isInternetConnectionAvailable()
            .then(() => {
                this.isLoading = true;

                setTimeout(async () => {
                    const searchValue = trim(this.searchInputControl.value);
                    let query = '';

                    if (searchValue.length > 0) {
                        query = '?tags=' + searchValue;
                    }

                    console.log('getImages query: ', query);
                    await this._imageService
                        .get(query)
                        .then(async (res) => {
                            console.log('getImages res: ', res);
                            this.images = JSON.parse(JSON.stringify(res));
                            console.log('getImages images: ', this.images);
                            this.chunkImages = res.items.splice(0, 10);
                            console.log(
                                'getImages chunkImages: ',
                                this.chunkImages
                            );

                            const modulo = this.images.items.length % 10;
                            const main = Math.floor(
                                this.images.items.length / 10
                            );
                            if (modulo > 0) {
                                this.maxPageIndex = main;
                            } else {
                                this.maxPageIndex = main - 1;
                            }

                            this.currentPageIndex = 0;
                        })
                        .catch((err) => {
                            console.log('getImages err: ', err);

                            this.images = 'error';

                            this._confirmationService.getError(
                                err.error.message
                            );
                        })
                        .finally(() => {
                            this.isLoading = false;
                            this._imageService.refreshImage.next(false);
                        });
                }, 800);
            })
            .catch((err) => {
                this._confirmationService.showErrorConnection(activeLang);
                this._imageService.refreshImage.next(false);
            });
    }

    async previewImage(selectedImage): Promise<any> {
        const images = [];
        for (const image of this.images.items) {
            images.push({
                src: image.media.m,
                alt: image.title,
                title: image.title,
                author: image.author,
                description: image.description
            });
        }

        const selectedIndex = this.images.items.findIndex(image => image.link === selectedImage.link);

        await this._imagePreviewService.setImages(images);

        if (selectedIndex > -1) {
            await this._imagePreviewService.setSelectedIndex(selectedIndex);
        } else {
            await this._imagePreviewService.setSelectedIndex(0);
        }
        await this._imagePreviewService.open();
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

    async detectSearch(): Promise<any> {
        if (this.searchTimeout) {
            await clearTimeout(this.searchTimeout);
        }

        this.searchTimeout = await setTimeout(async () => {
            await clearTimeout(this.searchTimeout);
            await this.searchChanged();
        }, 800);
    }

    async clearSearch(): Promise<any> {
        const searchValue = trim(this.searchInputControl.value);

        if (searchValue.length > 0) {
            this.searchInputControl.reset();
            await this.searchChanged();
        }
    }
}
