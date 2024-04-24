import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

import { Car } from '../services/api/api-types';
import { CrudCarService } from '../services/api/crud-car.service';
import { GetCarsService } from '../services/api/get-cars.service';
import {
  CarTemplate,
  RandomGeneratorsService,
} from '../services/random-generators.service';

@Component({
  imports: [
    FormsModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  selector: 'app-edit-car-dialog',
  standalone: true,
  template: `<h3 mat-dialog-title>Garage master</h3>
    <mat-dialog-content class="inputs-container">
      <input
        type="text"
        class="car-name-input"
        name="carName"
        [(ngModel)]="carTemplate.name"
      />
      <input
        type="color"
        class="car-color-input"
        id="car-color-input"
        (change)="onColorChange($event)"
      />
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onClose()" class="return-button">
        Return to Garage
      </button>
      <button mat-button (click)="onSave()" [disabled]="processing">
        {{ existingCar ? 'Update' : 'Create' }}
      </button>
    </mat-dialog-actions>`,
  styles: `
    .inputs-container {
      display: flex;
      gap: 10px;
    }
    .return-button {
      margin-left: auto;
    }
  `,
})
export class EditCarDialogComponent implements OnInit {
  processing = false;
  colorInput!: HTMLInputElement;
  carTemplate: CarTemplate = { name: '', color: '' };

  constructor(
    public dialogRef: MatDialogRef<EditCarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public existingCar: Car | undefined, // Make initialCar optional
    private ngZone: NgZone,
    private crudCarService: CrudCarService,
    private getCarsService: GetCarsService,
    private randomGeneratorsService: RandomGeneratorsService,
  ) {}

  ngOnInit() {
    this.colorInput = document.getElementById(
      'car-color-input',
    ) as HTMLInputElement;

    if (this.existingCar) {
      this.carTemplate.name = this.existingCar.name;
      this.carTemplate.color = this.existingCar.color;
      this.colorInput.value = this.carTemplate.color;
    } else {
      this.setUpFieldsWithRandomValues();
    }
  }

  setUpFieldsWithRandomValues() {
    this.carTemplate.name = this.randomGeneratorsService.getRandomCarName();
    this.carTemplate.color = this.randomGeneratorsService.getRandomColor();
    this.colorInput.value = this.carTemplate.color;
  }

  onColorChange(event: Event) {
    const selectedColor = (event.target as HTMLInputElement).value;
    this.ngZone.runOutsideAngular(() => {
      this.carTemplate.color = selectedColor;
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSave() {
    this.processing = true;

    if (this.existingCar) {
      this.crudCarService
        .updateCar(this.carTemplate, this.existingCar.id)
        .subscribe({
          next: () => {
            this.processing = false;
            this.getCarsService.getCars();
            this.dialogRef.close();
          },
        });
    } else {
      this.crudCarService.createCar(this.carTemplate).subscribe({
        next: () => {
          this.processing = false;
          this.getCarsService.getCars();
          this.dialogRef.close();
        },
      });
    }
  }
}
