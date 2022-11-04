import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DestroyService } from '@nx-the-movies/shared/common';
import { takeUntil } from 'rxjs';

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
    this.control.valueChanges.pipe(takeUntil(this.destroy$)).subscribe({
      next: (value) => {
        if (value) {
          this.sortBy.emit(value);
        }
      }
    });
  }
}
