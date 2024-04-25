import { Component, computed, Input } from '@angular/core';

import { CrudCarService } from '../../services/api/crud-car.service';
import { CrudWinnerService } from '../../services/api/crud-winner.service';
import { GetCarsService } from '../../services/api/get-cars.service';

@Component({
  selector: 'app-remove-car-button',
  standalone: true,
  template: `<button
    (click)="removeCarFromGarage(id)"
    [disabled]="deletingIsInProgress"
  >
    Remove Car
  </button>`,
  styles: `
    ::ng-deep app-remove-car-button {
      margin-left: auto;
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
  ) {}

  @Input() id!: number;

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
