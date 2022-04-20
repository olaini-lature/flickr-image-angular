import { Component, OnDestroy, OnInit, HostListener } from '@angular/core';
import { ImagePreviewService } from 'app/services/image-preview.service';

interface Image {
    src: string;
    alt: string;
    title: string;
    author: string;
    description: string;
}

@Component({
    selector: 'app-image-preview',
    templateUrl: './image-preview.component.html',
    styleUrls: ['./image-preview.component.scss'],
})
export class ImagePreviewComponent implements OnInit, OnDestroy {

    images: Array<Image>;

    selectedIndex = 0;

    constructor(private _imagePreviewService: ImagePreviewService) {}

    @HostListener('window:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent): any {
        const charCode = event.which ? event.which : event.keyCode;

        if (charCode === 37) {
            // left
            if (this.images.length > 1) {
                this.prevImage();
            }
        } else if (charCode === 39) {
            // right
            if (this.images.length > 1) {
                this.nextImage();
            }
        } else if (charCode === 27) {
            // esc
            this.closePreview();
        }
    }

    ngOnInit(): void {
        this.images = this._imagePreviewService.images;
        this.selectedIndex = this._imagePreviewService.selectedIndex;
        console.log('IMAGE PREVIEW ON INIT');
    }

    ngOnDestroy(): void {
        this.images = [];
        console.log('IMAGE PREVIEW ON DESTROY');
    }

    closePreview(): void {
        this._imagePreviewService.close();
    }

    nextImage(): void {
        if (this.selectedIndex === this.images.length - 1) {
            this.selectedIndex = 0;
        } else {
            this.selectedIndex++;
        }
    }

    prevImage(): void {
        if (this.selectedIndex === 0) {
            this.selectedIndex = this.images.length - 1;
        } else {
            this.selectedIndex--;
        }
    }
}
