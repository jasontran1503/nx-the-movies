import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DestroyService } from '@nx-the-movies/shared/common';
import { MovieService } from '@nx-the-movies/shared/data-access/apis';
import { ListResponse, Movie } from '@nx-the-movies/shared/data-access/models';
import { MovieListComponent } from '@nx-the-movies/shared/ui/movie-list';
import { BehaviorSubject, catchError, of, switchMap, takeUntil } from 'rxjs';
import { MOVIE_DISCOVER } from './home.constant';

@Component({
  selector: 'nx-the-movies-home',
  standalone: true,
  imports: [CommonModule, MovieListComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);
  private destroy$ = inject(DestroyService);
  private movieService = inject(MovieService);
  private page$ = new BehaviorSubject<number>(1);

  header = { main: '', sub: '' };
  movieResponse!: ListResponse<Movie>;
  isLoading$ = new BehaviorSubject<boolean>(true);
  error$ = new BehaviorSubject<boolean>(false);

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        switchMap((params) => {
          this.isLoading$.next(true);
          this.error$.next(false);
          const key = Object.keys(params)[0];
          if (key) {
            this.header = { main: key, sub: params[key] };
          }
          return of(Number(params['id']));
        }),
        switchMap((id) => this.loadMoviesData(id)),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (movieResponse) => {
          if (movieResponse) {
            this.isLoading$.next(false);
            this.movieResponse = movieResponse;
            this.cdr.markForCheck();
          }
        }
      });
  }

  onChangePage(page: number) {
    this.page$.next(page);
    this.isLoading$.next(true);
  }

  private loadMoviesData(id: number) {
    this.page$.next(1);
    return this.page$.pipe(
      switchMap((page) => {
        if (this.header.main === 'search') {
          return this.movieService.search(this.header.sub, page);
        }
        const type = this.header.sub.replace(/ /g, '_');
        if (!MOVIE_DISCOVER.includes(type)) {
          return this.movieService.getMoviesWithGenres(id, page);
        }
        return this.movieService.getMovies(type, page);
      }),
      catchError(() => {
        this.error$.next(true);
        return of(null);
      })
    );
  }
}
