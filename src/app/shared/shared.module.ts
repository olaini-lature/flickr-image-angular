import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImagePreviewComponent } from './component/image-preview/image-preview.component';
import { ImagePreviewOverlayComponent } from 'app/shared/component/image-preview-overlay/image-preview-overlay.component';
import { MaterialModule } from '../material.module';
import { PinchZoomModule } from 'ngx-pinch-zoom';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        PinchZoomModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        ImagePreviewComponent,
        ImagePreviewOverlayComponent
    ],
    entryComponents: [
        ImagePreviewComponent,
        ImagePreviewOverlayComponent
    ]
})
export class SharedModule
{
}
