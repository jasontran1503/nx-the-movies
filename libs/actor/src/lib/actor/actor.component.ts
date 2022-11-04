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
import { Movie, Person } from '@nx-the-movies/shared/data-access/models';
import { SelectMovieSortByComponent } from '@nx-the-movies/shared/ui/select-movie-sort-by';
import { EMPTY, forkJoin, map, switchMap, takeUntil } from 'rxjs';

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

  private sortByValue = 'popularity';
  private personId = 0;
  private page = 1;

  actor!: Person;
  movies: Movie[] = [];

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((params) => Number(params.get('id'))),
        switchMap((personId) => {
          if (!personId) return EMPTY;
          this.personId = personId;

          return forkJoin([
            this.personService.getPersonBio(personId),
            this.movieService.getMoviesWithCast(personId, this.sortByValue)
          ]);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: ([person, movies]) => {
          this.actor = person;
          this.movies = movies;
          this.cdr.markForCheck();
        }
      });
  }

  sortBy(value: string) {
    this.sortByValue = value;
    this.movieService
      .getMoviesWithCast(Number(this.personId), this.sortByValue)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (movies) => {
          this.movies = movies;
          this.cdr.markForCheck();
        }
      });
  }
}
