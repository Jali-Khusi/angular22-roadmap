import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationHeader } from '../component/navigation-header/navigation-header';

@Component({
  imports: [NavigationHeader, RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {}
