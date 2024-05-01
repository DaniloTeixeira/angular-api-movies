import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { API_INFO } from '../../data/api-info';
import { ApiResult, Movie } from '../../models/Movie.interface';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = API_INFO.BASE_URL;
  public getTopRatedMovies(): Observable<ApiResult[]> {
    const url = `${this.baseUrl}/top_rated`;

    let params = new HttpParams().append('page', '1');

    return this.http
      .get<Movie>(url, { params })
      .pipe(map((res) => res.results.slice(0, 10)));
  }
}
