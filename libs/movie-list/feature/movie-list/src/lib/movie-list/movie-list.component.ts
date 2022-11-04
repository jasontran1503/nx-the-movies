import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, Input, OnInit } from '@angular/core';
import { MovieItemComponent } from '@nx-the-movies/movie-list/ui/movie-item';
import { Movie } from '@nx-the-movies/shared/data-access/models';
import { LoadingComponent } from '@nx-the-movies/shared/ui/loading';

@Component({
  selector: 'nx-the-movies-movie-list[header]',
  standalone: true,
  imports: [CommonModule, MovieItemComponent, LoadingComponent],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListComponent implements OnInit {
  @Input() header!: { main: string; sub: string };
  @Input() movies: Movie[] = [];
  @Input() isLoading = false;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (window.innerHeight + window.scrollY + 100 >= document.body.scrollHeight) {
      // console.log('reached bottom');
    }
  }

  ngOnInit(): void {
    console.log();
  }
}
