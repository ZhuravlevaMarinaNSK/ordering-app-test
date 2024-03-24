import { Component } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Ordering App';

  isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.isLoading$.next(true);
        }
        else if (event instanceof NavigationEnd) {
          this.isLoading$.next(false);
        }
      });
  }
}
