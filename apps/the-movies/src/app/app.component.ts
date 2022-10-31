import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'nx-the-movies-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterModule]
})
export class AppComponent {}
