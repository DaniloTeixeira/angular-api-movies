import { Location } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiResult } from '../../models/Movie.interface';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly location = inject(Location);

  protected movie = this.location.getState() as ApiResult;

  ngOnInit(): void {
    if (!this.movie.id) {
      this.router.navigate(['/']);
    }
  }
}
