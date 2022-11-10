import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DestroyService } from '@nx-the-movies/shared/common';
import { MovieService, PersonService } from '@nx-the-movies/shared/data-access/apis';
import { ListResponse, Movie, Person } from '@nx-the-movies/shared/data-access/models';
import { MovieListComponent } from '@nx-the-movies/shared/ui/movie-list';
import { SelectMovieSortByComponent } from '@nx-the-movies/shared/ui/select-movie-sort-by';
import { BehaviorSubject, catchError, EMPTY, map, Observable, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'nx-the-movies-actor',
  standalone: true,
  imports: [CommonModule, MovieListComponent, SelectMovieSortByComponent],
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.scss'],
  providers: [DestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActorComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private personService = inject(PersonService);
  private movieService = inject(MovieService);
  private filter$ = new BehaviorSubject<{ page: number; sortBy: string }>({
    page: 1,
    sortBy: 'popularity'
  });
  private personId$ = this.route.paramMap.pipe(map((params) => Number(params.get('id'))));

  actor$!: Observable<Person>;
  movieResponse$!: Observable<ListResponse<Movie> | null>;
  isLoading$ = new BehaviorSubject<boolean>(true);

  ngOnInit(): void {
    this.actor$ = this.personId$.pipe(
      switchMap((personId) => {
        if (!personId) return EMPTY;
        return this.personService.getPersonBio(personId);
      })
    );

    this.movieResponse$ = this.personId$.pipe(
      switchMap((personId) =>
        this.filter$.pipe(
          map((filter) => {
            return { ...filter, personId };
          })
        )
      ),
      switchMap(({ page, sortBy, personId }) =>
        this.movieService.getMoviesWithCast(personId, sortBy, page).pipe(
          tap(() => this.isLoading$.next(false)),
          catchError(() => of(null))
        )
      )
    );
  }

  sortBy(value: string) {
    this.filter$.next({
      page: 1,
      sortBy: value
    });
    this.isLoading$.next(true);
  }

  onChangePage(page: number) {
    this.filter$.next({
      page,
      sortBy: this.filter$.getValue().sortBy
    });
    this.isLoading$.next(true);
  }
}
