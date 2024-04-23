import { Component, Input } from '@angular/core';

import { CrudCarService } from '../../services/api/crud-car.service';
import { CrudWinnerService } from '../../services/api/crud-winner.service';
import { GetCaarsService } from '../../services/api/get-cars.service';

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

  constructor(
    private crudCarService: CrudCarService,
    private crudWonnerService: CrudWinnerService,
    private getCarsService: GetCaarsService,
  ) {}

  @Input() id!: number;

  removeCarFromGarage(id: number) {
    this.deletingIsInProgress = true;

    this.crudCarService.deleteCar(id).subscribe({
      next: () => {
        this.getCarsService.getCars();
        this.crudWonnerService.getWinner(id).subscribe({
          next: (winner) => {
            if (winner) {
              this.crudWonnerService.deleteWinner(id);
            }
          },
        });
      },
    });
  }
}
