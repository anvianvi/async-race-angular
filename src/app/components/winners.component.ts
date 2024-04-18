import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'winners-page',
  standalone: true,
  // imports: [RouterOutlet],
  template: `<div class="winners-view">winners</div> `,
  styles: `

 .winners-view {
  min-width: 300px;
  min-height: 300px;
  background-color: aquamarine;;
}`,
})
export class WinnersComponent {}
