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
import { MovieService } from '@nx-the-movies/shared/data-access/apis';
import { DestroyService } from '@nx-the-movies/shared/data-access/common';
import { Movie } from '@nx-the-movies/shared/data-access/models';
import { switchMap, takeUntil, tap } from 'rxjs';
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

  header = { main: '', sub: '' };
  movies: Movie[] = [];
  isLoading = false;

  ngOnInit(): void {
    this.isLoading = true;
    this.route.queryParams
      .pipe(
        tap((value: { [key: string]: string }) => {
          const key = Object.keys(value)[0];
          this.header = {
            main: key,
            sub: value[key]
          };
        }),
        switchMap((value: { [key: string]: string }) => {
          if (this.header.main === 'search') {
            return this.movieService.search(this.header.sub);
          }
          const type = this.header.sub.replace(/ /g, '_');
          if (!MOVIE_DISCOVER.includes(type)) {
            return this.movieService.getMoviesWithGenres(Number(value['id']));
          }
          return this.movieService.getMovies(type);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          this.movies = res;
          this.cdr.markForCheck();
        }
      });
  }
}
