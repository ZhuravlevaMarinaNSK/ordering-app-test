import {Component, inject} from '@angular/core';
import {MainPath} from '../../app-routing.module';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {OrderService} from '../../api/orders';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {BehaviorSubject, catchError, of, tap} from 'rxjs';

@Component({
  selector: 'app-order-details',
  standalone: true,
  templateUrl: './order-details.component.html',
  imports: [
    RouterLink,
    MatCardModule,
    NgIf,
    AsyncPipe,
    NgForOf
  ],
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent {
  error$ = new BehaviorSubject<string | null>(null);
  id = +this.route.snapshot.params['id'];
  data$ = inject(OrderService).getOrderByID(this.id).pipe(
    catchError(err => {
      this.error$.next(err);
      return of(err)
    })
  );

  constructor(private route: ActivatedRoute) {
  }
  protected readonly MainPath = MainPath;
}
