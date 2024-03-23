import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MainPath} from '../../app-routing.module';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-main-page',
  standalone: true,
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  imports: [
    RouterOutlet,
    MatSidenavModule,
    RouterLink,
    MatIconModule
  ]
})
export class MainPageComponent {
  MainPath = MainPath;
}
