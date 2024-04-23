import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
  ],
  template: `<div class="nav-container">
    <nav>
      <a
        class="nav-button"
        routerLink="/garage"
        routerLinkActive="active"
        ariaCurrentWhenActive="page"
        >Garage</a
      >
      <a
        class="nav-button"
        routerLink="/winners"
        routerLinkActive="active"
        ariaCurrentWhenActive="page"
        >Winners</a
      >
    </nav>
  </div> `,
  styles: `
    .nav-container {
      padding: 10px;

      nav {
        display: flex;
        gap: 30px;
        width: fit-content;
        margin-inline: auto;
      }
    }
    .nav-button {
      background: #ffe042;
      color: #143d59;
      padding: 5px 30px;
      font-size: 15px;
      text-transform: uppercase;
      display: inline-block;
      font-weight: 700;
      border-radius: 5px;
      box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.15);
      transition:
        transform 0.3s,
        background 0.3s;
      text-decoration: none;
      user-select: none;
    }

    .nav-button:hover {
      transform: translateY(-3px);
      background: #fafaff;
    }
  `,
})
export class NavigationComponent {}
