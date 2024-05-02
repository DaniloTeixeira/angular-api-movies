import { Location } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TrailerDialogComponent } from '../../components/trailer-dialog';
import { ApiResult } from '../../models/Movie.interface';
import { VideoResult } from '../../models/MovieVideo.interface';
import { MovieService } from '../../services/movie';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  private readonly matDialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly movieService = inject(MovieService);

  protected video?: VideoResult;
  protected movie = this.location.getState() as ApiResult;

  ngOnInit(): void {
    if (!this.movie.id) {
      this.router.navigate(['/']);
      return;
    }

    this.getVideoInfoById(this.movie.id);
  }

  onOpenTrailerModal(): void {
    this.matDialog.open(TrailerDialogComponent, {
      autoFocus: false,
      data: this.video,
    });
  }

  private getVideoInfoById(movieId: number): void {
    this.movieService
      .getVideoInfoById(movieId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((videoInfo) => {
        this.video = videoInfo.find((video) => video.type === 'Trailer');
      });
  }
}
