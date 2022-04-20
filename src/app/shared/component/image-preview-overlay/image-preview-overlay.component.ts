import { Component, OnInit } from '@angular/core';
import { ImagePreviewService } from 'app/services/image-preview.service';

@Component({
  selector: 'app-image-preview-overlay',
  templateUrl: './image-preview-overlay.component.html',
  styleUrls: ['./image-preview-overlay.component.scss']
})
export class ImagePreviewOverlayComponent implements OnInit {

  constructor(
    private _imagePreviewService: ImagePreviewService
  ) { }

  ngOnInit(): void {
  }

  closePreview(): any {
    this._imagePreviewService.close();
  }

}
