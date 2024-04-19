/* eslint-disable no-console */
import { Component, computed, OnInit } from '@angular/core';

import { GetCaarsService } from './get-cars.service';
// import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-garage-page',
  standalone: true,
  // imports: [RouterOutlet],
  template: `<div class="garage-view">
    my garage
    @if (cars().length > 0) {
      <ul>
        @for (car of cars(); track car.id) {
          <li>{{ car.name }} - {{ car.color }}</li>
        }
      </ul>
    } @else {
      <p>pls w8 we warm up the server</p>
    }
  </div> `,
  styles: `
    .garage-view {
      min-width: 300px;
      min-height: 300px;
      background-color: aqua;
    }
  `,
})
export class GarageComponent implements OnInit {
  // cars: Car[] | [] = [];
  cars = computed(() => {
    console.log(this.cars);
    return this.getCarsService.carsInGarage();
  });
  carsCount: number = 0;

  constructor(private getCarsService: GetCaarsService) {}

  ngOnInit(): void {
    this.getCarsService.getCars();
    // this.cars = this.getCarsService.carsInGarage();
    // this.carsCount = this.getCarsService.totalAmountofCarsInGarage();
    // console.log(this.carsCount);
    // const cars = computed(() => {
    //   console.log(cars);
    //   return this.getCarsService.carsInGarage();
    // });
  }
}
