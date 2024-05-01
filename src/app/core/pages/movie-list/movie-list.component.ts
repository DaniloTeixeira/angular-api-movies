import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, debounceTime, map, startWith, tap } from 'rxjs';
import { ApiResult } from '../../models/Movie.interface';
import { MovieService } from '../../services/movie';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly movieService = inject(MovieService);

  protected movies: ApiResult[] = [];
  protected readonly filterField = new FormControl('');

  protected searchingMovies = false;
  protected showNoMoviesFoundMessage = false;
  protected filteredMovies$!: Observable<ApiResult[]>;

  ngOnInit(): void {
    this.getTopRatedMovies();
    this.setFilteredMovies();
  }

  goToMovieDetails(movie: ApiResult): void {
    this.router.navigate(['/movies/details'], { state: movie });
  }

  private getTopRatedMovies(): void {
    this.movieService
      .getTopRatedMovies()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((movies) => {
        this.movies = movies;
      });
  }

  private filterMovies(value: string): ApiResult[] {
    this.showNoMoviesFoundMessage = false;

    const filterValue = value.toLowerCase();

    const filteredMovies = this.movies.filter((movie) =>
      movie.title.toLowerCase().includes(filterValue)
    );

    if (!filteredMovies.length) {
      this.showNoMoviesFoundMessage = true;
    }

    return filteredMovies;
  }

  private setFilteredMovies(): void {
    this.filteredMovies$ = this.filterField.valueChanges.pipe(
      tap(() => (this.searchingMovies = true)),
      takeUntilDestroyed(this.destroyRef),
      startWith(''),
      debounceTime(500),
      map((value) => this.filterMovies(value as string)),
      tap(() => (this.searchingMovies = false))
    );
  }
}
