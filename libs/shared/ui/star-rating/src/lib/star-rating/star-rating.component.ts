import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'nx-the-movies-star-rating[rating]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit {
  @Input() rating!: number;
  @Input() showScore = false;

  starsRating: number[] = [];

  ngOnInit(): void {
    const array: number[] = [];
    const score = this.rating / 2;
    const full = Math.floor(score);
    const half = score - full >= 0.5 ? 0.5 : 0;

    for (let i = 0; i < full; i++) {
      array.push(1);
    }
    array.push(half);
    this.starsRating = [...array];
    if (array.length < 5) {
      for (let i = 0; i < 5 - array.length; i++) {
        this.starsRating.push(0);
      }
    }
  }
}
