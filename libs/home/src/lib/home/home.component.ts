import { MovieListComponent } from '@nx-the-movies/movie-list/feature/movie-list';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs';
import { DestroyService } from '@nx-the-movies/shared/data-access/common';

@Component({
  selector: 'nx-the-movies-home',
  standalone: true,
  imports: [CommonModule, MovieListComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DestroyService]
})
export class HomeComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private destroy$ = inject(DestroyService);

  header = {
    main: '',
    sub: ''
  };

  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe({
      next: (value: { [key: string]: string }) => {
        const key = Object.keys(value)[0];
        this.header = {
          main: key,
          sub: value[key]
        };
      }
    });
  }
}
