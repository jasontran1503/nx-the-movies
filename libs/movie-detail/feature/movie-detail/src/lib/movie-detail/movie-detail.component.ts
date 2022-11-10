import { CommonModule, Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit
} from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DestroyService } from '@nx-the-movies/shared/common';
import { MovieService } from '@nx-the-movies/shared/data-access/apis';
import {
  Credits,
  ListResponse,
  Movie,
  MovieDetail
} from '@nx-the-movies/shared/data-access/models';
import { MovieListComponent } from '@nx-the-movies/shared/ui/movie-list';
import { StarRatingComponent } from '@nx-the-movies/shared/ui/star-rating';
import { BehaviorSubject, catchError, forkJoin, map, switchMap, takeUntil, tap, of } from 'rxjs';

@Component({
  selector: 'nx-the-movies-movie-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, StarRatingComponent, MovieListComponent],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
  providers: [DestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieDetailComponent implements OnInit {
  private location = inject(Location);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);
  private destroy$ = inject(DestroyService);
  private movieService = inject(MovieService);
  private page$ = new BehaviorSubject<number>(1);
  private movieId$ = this.route.paramMap.pipe(map((params) => Number(params.get('id'))));

  movieDetail!: MovieDetail;
  credits!: Credits;
  movieResponse!: ListResponse<Movie>;

  ngOnInit(): void {
    this.movieId$
      .pipe(
        switchMap((id) =>
          forkJoin([this.movieService.getMovieDetail(id), this.movieService.getCredits(id)])
        ),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: ([movieDetail, credits]) => {
          this.movieDetail = movieDetail;
          this.credits = credits;
          this.cdr.markForCheck();
        }
      });

    this.movieId$.pipe(switchMap((id) => this.loadMovies(id))).subscribe({
      next: (movieResponse) => {
        if (movieResponse) {
          this.movieResponse = movieResponse;
          this.cdr.markForCheck();
        }
      }
    });
  }

  onChangePage(page: number) {
    this.page$.next(page);
  }

  back() {
    this.location.back();
  }

  private loadMovies(id: number) {
    this.page$.next(1);
    return this.page$.pipe(
      switchMap((page) =>
        this.movieService.getRecommendations(id, page).pipe(catchError(() => of(null)))
      )
    );
  }
}
