import { startWith, takeUntil } from 'rxjs';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  Output,
  EventEmitter
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { DestroyService } from '@nx-the-movies/shared/common';

@Component({
  selector: 'nx-the-movies-select-movie-sort-by',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './select-movie-sort-by.component.html',
  styleUrls: ['./select-movie-sort-by.component.scss'],
  providers: [DestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectMovieSortByComponent implements OnInit {
  private destroy$ = inject(DestroyService);
  control = new FormControl('popularity');

  @Output() sortBy = new EventEmitter<string>();

  ngOnInit(): void {
    this.control.valueChanges.pipe(startWith('popularity'), takeUntil(this.destroy$)).subscribe({
      next: (value) => {
        if (value) {
          this.sortBy.emit(value);
        }
      }
    });
  }
}
