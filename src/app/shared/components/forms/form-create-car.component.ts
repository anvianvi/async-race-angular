import { Component, NgZone, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CrudCarService } from '../../services/api/crud-car.service';
import { GetCarsService } from '../../services/api/get-cars.service';
import { RandomGeneratorsService } from '../../services/random-generators.service';

@Component({
  imports: [FormsModule],
  selector: 'app-create-car-form',
  standalone: true,
  template: `
    <form class="create-car-form">
      <input
        type="text"
        class="car-name-input"
        name="carName"
        [(ngModel)]="car.name"
      />
      <input
        type="color"
        class="car-color-input"
        id="crete-car-color-input"
        (change)="onColorChange($event)"
      />
      <button
        class="action-button"
        (click)="createCar()"
        [disabled]="creationInProgress"
      >
        Create
      </button>
    </form>
  `,
  styles: `
    .create-car-form {
      width: fit-content;
      display: flex;
      gap: 10px;
      margin: 20px auto;
    }
    .car-color-input {
      cursor: pointer;
    }
  `,
})
export class CreateCarFormComponent implements OnInit {
  car = { name: '', color: '' };
  creationInProgress = false;
  colorInput!: HTMLInputElement;

  constructor(
    private ngZone: NgZone,
    private randomGeneratorsService: RandomGeneratorsService,
    private crudCarService: CrudCarService,
    private getCarsService: GetCarsService,
  ) {}

  ngOnInit() {
    this.colorInput = document.getElementById(
      'crete-car-color-input',
    ) as HTMLInputElement;

    this.setUpFieldsWithRandomValues();
  }

  onColorChange(event: Event) {
    const selectedColor = (event.target as HTMLInputElement).value;
    this.ngZone.runOutsideAngular(() => {
      this.car.color = selectedColor;
    });
  }

  setUpFieldsWithRandomValues() {
    this.car.name = this.randomGeneratorsService.getRandomCarName();
    this.car.color = this.randomGeneratorsService.getRandomColor();
    this.colorInput.value = this.car.color;
  }

  createCar() {
    this.creationInProgress = true;
    this.crudCarService.createCar(this.car).subscribe({
      next: (createCarResponse) => {
        if (createCarResponse) {
          this.getCarsService.getCars();
          this.setUpFieldsWithRandomValues();
          this.creationInProgress = false;
        }
      },
    });
  }
}
