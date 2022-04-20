import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { ImagePreviewOverlayComponent } from 'app/shared/component/image-preview-overlay/image-preview-overlay.component';

interface Image {
    src: string;
    alt: string;
    title: string;
    author: string;
    description: string;
}

@Injectable({
    providedIn: 'root',
})
export class ImagePreviewService {
    images: Array<Image>;
    selectedIndex = 0;
    isOpened = false;
    private overlayRef: OverlayRef = null;

    constructor(private overlay: Overlay) {}

    async setImages(images): Promise<any> {
        this.images = images;
    }

    async setSelectedIndex(index): Promise<any> {
        this.selectedIndex = index;
    }

    async open(): Promise<any> {
        if (!this.overlayRef) {
            this.overlayRef = await this.overlay.create();
        }

        const loaderOverlay = new ComponentPortal(ImagePreviewOverlayComponent);
        this.overlayRef.attach(loaderOverlay);
        this.isOpened = true;
    }

    async close(): Promise<any> {
        if (this.overlayRef) {
            this.overlayRef.detach();
        }

        this.images = [];
        this.isOpened = false;
    }
}
