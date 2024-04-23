/* eslint-disable no-console */
import { AfterViewChecked, Component, computed, OnInit } from '@angular/core';

import { CarContainerComponent } from '../shared/components/car-container.component';
import { GetCaarsService } from '../shared/services/api/get-cars.service';
// import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-garage-page',
  standalone: true,
  // imports: [RouterOutlet],
  template: `<div class="garage-view">
    my garage curently have {{ carsCount() }} cars:

    @if (cars().length > 0) {
      @for (car of cars(); track car.id) {
        <app-car-container [car]="car"></app-car-container>
        <!-- <li>{{ car.name }} - {{ car.color }}</li> -->
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
  imports: [CarContainerComponent],
})
export class GarageComponent implements OnInit, AfterViewChecked {
  cars = computed(() => {
    return this.getCarsService.carsInGarage();
  });
  carsCount = computed(() => {
    return this.getCarsService.totalAmountofCarsInGarage();
  });

  constructor(private getCarsService: GetCaarsService) {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method, class-methods-use-this
  ngAfterViewChecked(): void {
    // console.log('Change detection triggered!');
    // console.log(this.cars());
  }

  ngOnInit(): void {
    this.getCarsService.getCars();
  }
}
