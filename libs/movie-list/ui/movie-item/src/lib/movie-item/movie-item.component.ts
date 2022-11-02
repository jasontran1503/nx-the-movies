import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StarRatingComponent } from '@nx-the-movies/shared/ui/star-rating';

@Component({
  selector: 'nx-the-movies-movie-item',
  standalone: true,
  imports: [CommonModule, StarRatingComponent],
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieItemComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
