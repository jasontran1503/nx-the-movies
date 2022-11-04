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
import { MovieService, PersonService } from '@nx-the-movies/shared/data-access/apis';
import { ListResponse, Movie, Person } from '@nx-the-movies/shared/data-access/models';
import { SelectMovieSortByComponent } from '@nx-the-movies/shared/ui/select-movie-sort-by';
import { BehaviorSubject, EMPTY, map, mergeMap, switchMap, takeUntil, tap } from 'rxjs';

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
  private cdr = inject(ChangeDetectorRef);
  private destroy$ = inject(DestroyService);
  private personService = inject(PersonService);
  private movieService = inject(MovieService);

  private filter$ = new BehaviorSubject<{ page: number; sortBy: string }>({
    page: 1,
    sortBy: 'popularity'
  });

  actor!: Person;
  movieResponse!: ListResponse<Movie>;

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((params) => Number(params.get('id'))),
        switchMap((personId) => {
          if (!personId) return EMPTY;
          return this.personService
            .getPersonBio(personId)
            .pipe(tap((person) => (this.actor = person)));
        }),
        mergeMap((person) =>
          this.filter$.pipe(
            switchMap(({ page, sortBy }) =>
              this.movieService.getMoviesWithCast(person.id, sortBy, page)
            )
          )
        ),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (movieResponse) => {
          this.movieResponse = movieResponse;
          this.cdr.markForCheck();
        }
      });
  }

  sortBy(value: string) {
    this.filter$.next({
      page: 1,
      sortBy: value
    });
  }

  onChangePage(page: number) {
    this.filter$.next({
      page,
      sortBy: this.filter$.getValue().sortBy
    });
  }
}
