import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-garage-page',
  standalone: true,
  // imports: [RouterOutlet],
  template: `<div class="garage-view">my garage</div> `,
  styles: `
    .garage-view {
      min-width: 300px;
      min-height: 300px;
      background-color: aqua;
    }
  `,
})
export class GarageComponent {}
