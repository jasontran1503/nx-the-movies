import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'nx-the-movies-movie-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss']
})
export class MovieItemComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
