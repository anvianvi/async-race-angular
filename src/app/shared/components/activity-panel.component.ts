import { Component } from '@angular/core';

import { CreateCarFormComponent } from './forms/form-create-car.component';

@Component({
  selector: 'app-activity-panel',
  standalone: true,
  template: `<div class="">
    <div class="forms">
      <app-create-car-form></app-create-car-form>
    </div>
    <div class="race-controls">
      <!-- <button class="action-btn race-btn" id="race">Race</button>
      <button class="action-btn reset-btn" id="reset"  >Reset</button>
      <button class="action-btn generator-btn" id="generator">Generate cars</button> -->
    </div>
  </div> `,
  styles: ``,
  imports: [CreateCarFormComponent],
})
export class ActivityPanelComponent {}
