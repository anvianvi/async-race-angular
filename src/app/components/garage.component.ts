/* eslint-disable no-console */
import { AfterViewChecked, Component, computed, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { GeneratePackOfCarsButtonComponent } from '../shared/components/buttons/crate-pack-of-cars-button.component';
import { CreateCarButtonComponent } from '../shared/components/buttons/create-car-button.component';
import { CarContainerComponent } from '../shared/components/car-container.component';
import { DataSorseToglerComponent } from '../shared/components/data-source-selector.component';
import { RaceControlComponent } from '../shared/components/reace-controll.component';
import { WinnerPopupComponent } from '../shared/components/winner-popup.component';
import { GetCarsService } from '../shared/services/api/get-cars.service';

@Component({
  selector: 'app-garage-page',
  standalone: true,
  template: `<div class="garage-view">
    @if (cars().length > 0) {
      <div class="garage-title-container">
        Currently you have {{ carsCount() }} cars in garage.
        <app-create-car-button></app-create-car-button>
        <app-create-pack-of-cars-button></app-create-pack-of-cars-button>
      </div>

      <div class="head-controls-container">
        <app-race-control [cars]="cars()"></app-race-control>
        <div class="pagination-container">
          <button
            mat-icon-button
            (click)="paginationLeft()"
            [disabled]="carsCurrentPage() < 2"
          >
            <mat-icon>chevron_left</mat-icon>
          </button>
          <div>Page {{ carsCurrentPage() }} / {{ totalPages() }}</div>

          <button
            mat-icon-button
            (click)="paginationRight()"
            [disabled]="isLastPage()"
          >
            <mat-icon>chevron_right</mat-icon>
          </button>
        </div>
      </div>
      @for (car of cars(); track car.id) {
        <app-car-container [car]="car"></app-car-container>
      }
    } @else {
      <p class="warm-up-notification">
        By default, the application is configured to communicate with a remote
        server located at https://flint-brazen-catshark.glitch.me/. After a
        period of non-use, it takes 5-15 seconds to turn on. Please wait
      </p>
    }
    <app-winner-popup></app-winner-popup>
  </div> `,
  styles: `
    .garage-view {
      width: 80vw;
      margin-inline: auto;

      .head-controls-container {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin-left: auto;
        gap: 10px;
        width: fit-content;
      }
      .pagination-container {
        display: flex;
        align-items: center;
        gap: 10px;
        width: fit-content;
        margin-bottom: 10px;
      }

      .garage-title-container {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        padding: 10px 0;
      }

      .warm-up-notification {
        padding-top: 50px;
      }
    }
  `,
  imports: [
    CarContainerComponent,
    CreateCarButtonComponent,
    GeneratePackOfCarsButtonComponent,
    RaceControlComponent,
    WinnerPopupComponent,
    MatIconModule,
    MatButtonModule,
    DataSorseToglerComponent,
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
  totalPages = computed(() => {
    return Math.ceil(this.carsCount() / this.getCarsService.elementsPerPage);
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
    this.getCarsService.carsCurrentPage.update((value) => value - 1);
    this.getCarsService.getCars();
  }
  paginationRight() {
    this.getCarsService.carsCurrentPage.update((value) => value + 1);
    this.getCarsService.getCars();
  }
}
