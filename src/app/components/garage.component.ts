/* eslint-disable no-console */
import { AfterViewChecked, Component, computed, OnInit } from '@angular/core';

import { ActivityPanelComponent } from '../shared/components/activity-panel.component';
import { CreateCarButtonComponent } from '../shared/components/buttons/create-car-button.component';
import { CarContainerComponent } from '../shared/components/car-container.component';
import { GetCarsService } from '../shared/services/api/get-cars.service';

@Component({
  selector: 'app-garage-page',
  standalone: true,
  template: `<div class="garage-view">
    <app-activity-panel></app-activity-panel>
    my garage curently have {{ carsCount() }} cars:
    <app-create-car-button></app-create-car-button>

    @if (cars().length > 0) {
      @for (car of cars(); track car.id) {
        <app-car-container [car]="car"></app-car-container>
      }
    } @else {
      <p>pls w8 we warm up the server</p>
    }
  </div> `,
  styles: `
    .garage-view {
      width: 80vw;
      margin-inline: auto;
    }
  `,
  imports: [
    CarContainerComponent,
    ActivityPanelComponent,
    CreateCarButtonComponent,
  ],
})
export class GarageComponent implements OnInit, AfterViewChecked {
  cars = computed(() => {
    return this.getCarsService.carsInGarage();
  });
  carsCount = computed(() => {
    return this.getCarsService.totalAmountofCarsInGarage();
  });

  constructor(private getCarsService: GetCarsService) {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method, class-methods-use-this
  ngAfterViewChecked(): void {
    console.log('Change detection triggered!');
  }

  ngOnInit(): void {
    this.getCarsService.getCars();
  }
}
