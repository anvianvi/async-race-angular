/* eslint-disable no-console */
import { AfterViewChecked, Component, computed, OnInit } from '@angular/core';

import { GeneratePackOfCarsButtonComponent } from '../shared/components/buttons/crate-pack-of-cars-button.component';
import { CreateCarButtonComponent } from '../shared/components/buttons/create-car-button.component';
import { CarContainerComponent } from '../shared/components/car-container.component';
import { RaceControlComponent } from '../shared/components/reace-controll.component';
import { GetCarsService } from '../shared/services/api/get-cars.service';

@Component({
  selector: 'app-garage-page',
  standalone: true,
  template: `<div class="garage-view">
    {{ carsCount() }} cars in garage
    <app-create-car-button></app-create-car-button>
    <app-create-pack-of-cars-button></app-create-pack-of-cars-button>
    <app-race-control [cars]="cars()"></app-race-control>
    <div>Page № {{ carsCurrentPage() }}</div>
    <button (click)="paginationLeft()" [disabled]="carsCurrentPage() < 2">
      PREV
    </button>
    <button (click)="paginationRight()" [disabled]="isLastPage()">NEXT</button>
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
    CreateCarButtonComponent,
    GeneratePackOfCarsButtonComponent,
    RaceControlComponent,
  ],
})
export class GarageComponent implements OnInit, AfterViewChecked {
  cars = computed(() => {
    return this.getCarsService.carsInGarage();
  });
  carsCount = computed(() => {
    return this.getCarsService.totalAmountofCarsInGarage();
  });
  carsCurrentPage = computed(() => {
    return this.getCarsService.carsCurrentPage();
  });
  isLastPage = computed(() => {
    return (
      this.carsCount() / this.getCarsService.elementsPerPage <=
      this.getCarsService.carsCurrentPage()
    );
  });

  constructor(private getCarsService: GetCarsService) {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method, class-methods-use-this
  ngAfterViewChecked(): void {
    console.log('Change detection triggered!');
  }

  ngOnInit(): void {
    this.getCarsService.getCars();
  }
  paginationLeft() {
    this.getCarsService.carsCurrentPage.set(
      this.getCarsService.carsCurrentPage() - 1,
    );
    this.getCarsService.getCars();
  }
  paginationRight() {
    this.getCarsService.carsCurrentPage.set(
      this.getCarsService.carsCurrentPage() + 1,
    );

    this.getCarsService.getCars();
  }
}
