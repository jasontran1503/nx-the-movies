import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'nx-the-movies-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterModule]
})
export class AppComponent implements OnInit {
  private router = inject(Router);

  ngOnInit(): void {
    this.router.navigate(['/list'], { queryParams: { category: 'popular' } });
  }
}
