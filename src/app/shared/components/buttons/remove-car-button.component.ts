import { Component, computed, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

import { CrudCarService } from '../../services/api/crud-car.service';
import { CrudWinnerService } from '../../services/api/crud-winner.service';
import { GetCarsService } from '../../services/api/get-cars.service';
import { CarDrivingService } from '../../services/car-driving.service';
import { RaceProcessService } from '../../services/race-process.service';

@Component({
  imports: [MatButtonModule, MatIconModule, MatTooltip],
  selector: 'app-remove-car-button',
  standalone: true,
  template: `
    <button
      [disabled]="!isCarInDriving(id) || raceInprogress()"
      mat-icon-button
      matTooltip="Delete this car"
      class="remove-car-button"
      (click)="removeCarFromGarage(id)"
    >
      <mat-icon>close</mat-icon>
    </button>
  `,
  styles: `
    .remove-car-button {
      color: white;
      &:hover {
        color: red;
      }
      &:disabled {
        color: #0c2637;
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
