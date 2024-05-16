import { computed, Injectable, signal } from '@angular/core';

import { Car } from './api-types';
import { DataSourseService } from './data-sourse.service';

@Injectable({
  providedIn: 'root',
})
export class GetCarsService {
  carsInGarage = signal<Car[] | []>([]);
  totalAmountofCarsInGarage = signal<number>(0);
  carsCurrentPage = signal<number>(1);
  elementsPerPageAccordingToRequirements = 7;
  elementsPerPage = this.elementsPerPageAccordingToRequirements;

  API_URL = computed(() => {
    return this.dataSourseService.API_URL();
  });

  constructor(private dataSourseService: DataSourseService) {}

  getCars = async () => {
    const response = await fetch(
      `${this.API_URL()}/garage?_page=${this.carsCurrentPage()}&_limit=${this.elementsPerPage}`,
    );

    const count = Number(response.headers.get('X-Total-Count'));
    const items = (await response.json()) as Car[];

    this.carsInGarage.set(items);
    this.totalAmountofCarsInGarage.set(count);
  };
}
