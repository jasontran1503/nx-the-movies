import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MovieItemComponent } from '@nx-the-movies/movie-list/ui/movie-item';

@Component({
  selector: 'nx-the-movies-movie-list[header]',
  standalone: true,
  imports: [CommonModule, MovieItemComponent],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListComponent implements OnInit {
  @Input() header!: { main: string; sub: string };

  ngOnInit(): void {
    console.log();
  }
}
