import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { StarRatingComponent } from '@nx-the-movies/movie-list/ui/star-rating';

@Component({
  selector: 'nx-the-movies-movie-item',
  standalone: true,
  imports: [CommonModule, StarRatingComponent],
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss']
})
export class MovieItemComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
