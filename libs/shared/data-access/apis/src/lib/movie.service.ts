import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { APP_CONFIG, ListResponse, Movie } from '@nx-the-movies/shared/data-access/models';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private appConfig = inject(APP_CONFIG);
  private http = inject(HttpClient);

  getMovies(type: string, page: number = 1) {
    return this.http
      .get<ListResponse<Movie>>(`${this.appConfig.baseUrl}movie/${type}`, { params: { page } })
      .pipe(map((res) => res.results));
  }

  getMoviesWithGenres(with_genres: number, page: number = 1) {
    return this.http
      .get<ListResponse<Movie>>(`${this.appConfig.baseUrl}discover/movie`, {
        params: { page, sort_by: 'popularity.desc', with_genres }
      })
      .pipe(map((res) => res.results));
  }

  search(query: string, page: number = 1) {
    return this.http
      .get<ListResponse<Movie>>(`${this.appConfig.baseUrl}search/movie`, {
        params: { page, query }
      })
      .pipe(map((res) => res.results));
  }

  getMoviesWithCast(with_cast: number, sort_by: string, page: number = 1) {
    return this.http
      .get<ListResponse<Movie>>(`${this.appConfig.baseUrl}discover/movie`, {
        params: { page, with_cast, sort_by: `${sort_by}.desc` }
      })
      .pipe(map((res) => res.results));
  }
}
