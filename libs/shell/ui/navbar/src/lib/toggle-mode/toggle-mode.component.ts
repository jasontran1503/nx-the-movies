import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'nx-the-movies-toggle-mode',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toggle-mode.component.html',
  styleUrls: ['./toggle-mode.component.scss']
})
export class ToggleModeComponent {
  light = true;
}
