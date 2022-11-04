import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieListComponent } from '@nx-the-movies/movie-list/feature/movie-list';
import { DestroyService } from '@nx-the-movies/shared/common';
import { MovieService } from '@nx-the-movies/shared/data-access/apis';
import { ListResponse, Movie } from '@nx-the-movies/shared/data-access/models';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  EMPTY,
  Subject,
  switchMap,
  takeUntil,
  tap
} from 'rxjs';
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
  isLoading$ = new Subject<boolean>();

  ngOnInit(): void {
    combineLatest([this.page$, this.route.queryParams])
      .pipe(
        tap(([, params]) => {
          this.isLoading$.next(true);
          const key = Object.keys(params)[0];
          if (key) {
            this.header = {
              main: key,
              sub: params[key]
            };
          }
        }),
        switchMap(([page, params]) => {
          if (this.header.main === 'search') {
            return this.movieService.search(this.header.sub, page).pipe(catchError(() => EMPTY));
          }
          const type = this.header.sub.replace(/ /g, '_');
          if (!MOVIE_DISCOVER.includes(type)) {
            return this.movieService
              .getMoviesWithGenres(Number(params['id']), page)
              .pipe(catchError(() => EMPTY));
          }
          return this.movieService.getMovies(type, page).pipe(catchError(() => EMPTY));
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (movieResponse) => {
          this.isLoading$.next(false);
          this.movieResponse = movieResponse;
          this.cdr.markForCheck();
        }
      });
  }

  onChangePage(page: number) {
    this.page$.next(page);
  }
}
