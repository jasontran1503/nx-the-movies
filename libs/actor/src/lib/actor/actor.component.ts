import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieListComponent } from '@nx-the-movies/movie-list/feature/movie-list';
import { PersonService } from '@nx-the-movies/shared/data-access/apis';
import { DestroyService } from '@nx-the-movies/shared/data-access/common';
import { SelectMovieSortByComponent } from '@nx-the-movies/shared/ui/select-movie-sort-by';
import { EMPTY, map, switchMap, takeUntil } from 'rxjs';

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
  private destroy$ = inject(DestroyService);
  private personService = inject(PersonService);

  actor$ = this.route.paramMap.pipe(
    map((params) => params.get('id')),
    switchMap((personId) => {
      if (!personId) return EMPTY;
      return this.personService.getPersonBio(Number(personId));
    }),
    takeUntil(this.destroy$)
  );

  ngOnInit(): void {}

  sortBy(value: string) {
    console.log(value);
  }
}
