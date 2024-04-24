import { Component } from '@angular/core';

import { CreateCarFormComponent } from './forms/form-create-car.component';

@Component({
  selector: 'app-activity-panel',
  standalone: true,
  template: `<div class="">
    <div class="forms">
      <app-create-car-form></app-create-car-form>
      <!-- <form action="" class="form" id="create">
        <input type="text" class="input" id="create-name" value="">
        <input type="color" class="color" id="create-color" value="#ffe042">
        <button class="action-btn"  id="create-btn">Create</button>
      </form> -->

      <!-- <form action="" class="form" id="update">
        <input type="text" class="input" id="update-name" name="name" disabled >
        <input type="color" class="color" id="update-color" name="color" value="#ffe042" disabled>
        <button class="action-btn" id="update-btn" "type="submit" disabled>Update</button>
      </form> -->
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
