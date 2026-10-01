import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-navigation-header',
  styleUrl: './navigation-header.scss',
  templateUrl: './navigation-header.html',
})
export class NavigationHeader {}
