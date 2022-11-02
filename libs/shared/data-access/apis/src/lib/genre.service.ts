import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { APP_CONFIG, GenreResponse } from '@nx-the-movies/shared/data-access/models';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  private appConfig = inject(APP_CONFIG);
  private http = inject(HttpClient);

  getGenres() {
    return this.http
      .get<GenreResponse>(`${this.appConfig.baseUrl}genre/movie/list`)
      .pipe(map((response) => response.genres));
  }
}
