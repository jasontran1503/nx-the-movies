import { MovieListComponent } from '@nx-the-movies/movie-list/feature/movie-list';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'nx-the-movies-home',
  standalone: true,
  imports: [CommonModule, MovieListComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
