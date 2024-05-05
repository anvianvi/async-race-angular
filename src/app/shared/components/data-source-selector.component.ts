import { Component, computed, signal } from '@angular/core';
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';

import { DataSourseService } from '../services/api/data-sourse.service';

@Component({
  imports: [MatSlideToggleModule],
  selector: 'app-data-sourse-selector',
  standalone: true,
  template: `
    <div class="data-sourse-togler-container">
      <mat-slide-toggle
        color="primary"
        [checked]="isChecked"
        (change)="toggleDataSource($event)"
      >
      </mat-slide-toggle
      ><span>
        You can change the data source. Current server - {{ API_URL() }}</span
      >
    </div>
  `,
  styles: `
    .data-sourse-togler-container {
      color: white;
      line-height: 2;
      margin: 0 0 5px;
    }
  `,
})
export class DataSorseToglerComponent {
  isChecked = signal(true);
  API_URL = computed(() => {
    return this.dataSourseService.API_URL();
  });

  constructor(private dataSourseService: DataSourseService) {}

  toggleDataSource(event: MatSlideToggleChange) {
    this.isChecked.set(event.checked);
    const newValue = this.isChecked()
      ? 'https://flint-brazen-catshark.glitch.me'
      : 'http://127.0.0.1:3000';

    this.dataSourseService.API_URL.set(newValue);
  }
}
