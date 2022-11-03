import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Movie } from '@nx-the-movies/shared/data-access/models';
import { StarRatingComponent } from '@nx-the-movies/shared/ui/star-rating';

@Component({
  selector: 'nx-the-movies-movie-item[movie]',
  standalone: true,
  imports: [CommonModule, StarRatingComponent],
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieItemComponent implements OnInit {
  @Input() movie!: Movie;

  ngOnInit(): void {}
}
