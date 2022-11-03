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

  getMoviesWithGenres(genreId: number, page: number = 1) {
    return this.http
      .get<ListResponse<Movie>>(`${this.appConfig.baseUrl}discover/movie`, {
        params: { page, sort_by: 'popularity.desc', with_genres: genreId }
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
}
