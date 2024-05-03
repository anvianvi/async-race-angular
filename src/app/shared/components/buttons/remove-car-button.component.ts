import { Component, computed, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { CrudCarService } from '../../services/api/crud-car.service';
import { CrudWinnerService } from '../../services/api/crud-winner.service';
import { GetCarsService } from '../../services/api/get-cars.service';
import { CarDrivingService } from '../../services/car-driving.service';
import { RaceProcessService } from '../../services/race-process.service';

@Component({
  imports: [MatButtonModule, MatDividerModule, MatIconModule],

  selector: 'app-remove-car-button',
  standalone: true,
  template: `
    <button
      mat-icon-button
      class="remove-car-button"
      [disabled]="!isCarInDriving(id) || raceInprogress()"
      (click)="removeCarFromGarage(id)"
    >
      <mat-icon>close</mat-icon>
    </button>
  `,
  styles: `
    ::ng-deep app-remove-car-button {
      margin-left: auto;
    }
    .remove-car-button {
      color: white;
      &:hover {
        color: red;
      }
    }
  `,
})
export class RemoveCarButtonComponent {
  deletingIsInProgress = false;

  carsCount = computed(() => {
    return this.getCarsService.totalAmountofCarsInGarage();
  });
  carsCurrentPage = computed(() => {
    return this.getCarsService.carsCurrentPage();
  });

  constructor(
    private crudCarService: CrudCarService,
    private crudWonnerService: CrudWinnerService,
    private getCarsService: GetCarsService,
    private raceService: RaceProcessService,
    private carDrivingService: CarDrivingService,
  ) {}

  @Input() id!: number;

  raceInprogress = computed(() => {
    return this.raceService.raceInprogress();
  });

  isCarInDriving(id: number): boolean {
    return this.carDrivingService.canTurnCarInDriving(id);
  }

  removeCarFromGarage(id: number) {
    this.deletingIsInProgress = true;

    this.crudCarService.deleteCar(id).subscribe({
      next: () => {
        this.crudWonnerService.getWinner(id).subscribe({
          next: (winner) => {
            if (winner) {
              this.crudWonnerService.deleteWinner(id).subscribe();
            }
          },
          error: () => {},
        });
        const lastValidPage = Math.ceil(
          (this.carsCount() - 1) / this.getCarsService.elementsPerPage,
        );

        this.getCarsService.carsCurrentPage.set(
          Math.min(this.carsCurrentPage(), lastValidPage),
        );

        this.getCarsService.getCars();
      },
      error: () => {},
    });
  }
}
