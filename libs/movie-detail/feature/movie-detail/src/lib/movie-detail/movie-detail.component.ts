import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from '@nx-the-movies/shared/ui/star-rating';

@Component({
  selector: 'nx-the-movies-movie-detail',
  standalone: true,
  imports: [CommonModule, StarRatingComponent],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
