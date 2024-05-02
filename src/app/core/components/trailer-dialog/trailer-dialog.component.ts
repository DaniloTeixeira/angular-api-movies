import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VideoResult } from '../../models/MovieVideo.interface';

@Component({
  selector: 'app-trailer-dialog',
  templateUrl: './trailer-dialog.component.html',
  styleUrls: ['./trailer-dialog.component.scss'],
})
export class TrailerDialogComponent {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly matDialogRef =
    inject<MatDialogRef<TrailerDialogComponent>>(MatDialogRef);

  protected safeTrailerLink!: SafeResourceUrl;

  constructor(@Inject(MAT_DIALOG_DATA) video: VideoResult) {
    this.sanitizeUrl(video.key);
  }

  onCloseDialog(): void {
    this.matDialogRef.close();
  }

  private sanitizeUrl(trailerKey: string): void {
    const url = `https://www.youtube.com/embed/${trailerKey}?autoplay=1`;

    this.safeTrailerLink = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
