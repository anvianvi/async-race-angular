import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

// import { Car } from '../../services/api/api-types';
import { EditCarDialogComponent } from '../edit-car-dialog.component';

@Component({
  imports: [MatDialogModule],
  selector: 'app-create-car-button',
  standalone: true,
  template: `
    <button mat-button (click)="openEditCarDialog()">Add new car</button>
  `,
  styles: ``,
})
export class CreateCarButtonComponent {
  // @Input() car!: Car;

  constructor(public dialog: MatDialog) {}
  openEditCarDialog() {
    this.dialog.open(EditCarDialogComponent, {
      // data: this.car,
    });
  }
}
