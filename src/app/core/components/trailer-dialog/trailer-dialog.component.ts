import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-trailer-dialog',
  templateUrl: './trailer-dialog.component.html',
  styleUrls: ['./trailer-dialog.component.scss']
})
export class TrailerDialogComponent {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly matDialogRef =
    inject<MatDialogRef<TrailerDialogComponent>>(MatDialogRef);

  protected safeTrailerLink!: SafeResourceUrl;

  constructor(@Inject(MAT_DIALOG_DATA) data: string) {
    this.safeTrailerLink = data;
    this.sanitizeUrl(data);
  }

  private sanitizeUrl(url: string): void {
    this.safeTrailerLink = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  onCloseDialog(): void {
    this.matDialogRef.close();
  }
}
