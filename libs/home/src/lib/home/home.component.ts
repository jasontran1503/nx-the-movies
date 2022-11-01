import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieListComponent } from '@nx-the-movies/movie-list/feature/movie-list';
import { DestroyService } from '@nx-the-movies/shared/data-access/common';
import { takeUntil } from 'rxjs';

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
