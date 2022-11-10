import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { ListResponse, Movie } from '@nx-the-movies/shared/data-access/models';
import { LoadingComponent } from '@nx-the-movies/shared/ui/loading';
import { MovieItemComponent } from '@nx-the-movies/shared/ui/movie-item';
import { PaginationComponent } from '@nx-the-movies/shared/ui/pagination';

@Component({
  selector: 'nx-the-movies-movie-list[header][movieResponse]',
  standalone: true,
  imports: [CommonModule, MovieItemComponent, LoadingComponent, PaginationComponent],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListComponent implements OnInit {
  @Input() header!: { main: string; sub: string };
  @Input() movieResponse!: ListResponse<Movie>;
  @Input() isLoading = false;
  @Input() error = false;

  @Output() changePage = new EventEmitter<number>();
  @ViewChild('moviePage') moviePage!: ElementRef<HTMLDivElement>;

  ngOnInit(): void {
    console.log();
  }

  onChangePage(page: number) {
    this.changePage.emit(page);
    this.moviePage.nativeElement.scrollIntoView();
  }
}
