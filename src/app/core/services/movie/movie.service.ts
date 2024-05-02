import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { API_INFO } from '../../data/api-info';
import { ApiResult, Movie } from '../../models/Movie.interface';
import { MovieVideo, VideoResult } from '../../models/MovieVideo.interface';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = API_INFO.BASE_URL;
  getTopRatedMovies(): Observable<ApiResult[]> {
    const url = `${this.baseUrl}/top_rated`;

    let params = new HttpParams().append('page', '1');

    return this.http
      .get<Movie>(url, { params })
      .pipe(map((res) => res?.results.slice(0, 10)));
  }

  getVideoInfoById(movieId: number): Observable<VideoResult[]> {
    const url = `${this.baseUrl}/${movieId}/videos`;

    return this.http.get<MovieVideo>(url).pipe(map((res) => res?.results));
  }
}
