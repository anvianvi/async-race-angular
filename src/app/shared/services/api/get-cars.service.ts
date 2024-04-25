import { Injectable, signal } from '@angular/core';

import { API_URL } from '../../variables/api';
import { Car } from './api-types';

@Injectable({
  providedIn: 'root',
})
export class GetCarsService {
  carsInGarage = signal<Car[] | []>([]);
  totalAmountofCarsInGarage = signal<number>(0);
  carsCurrentPage = signal<number>(1);
  elementsPerPageAccordingToRequirements = 7;
  elementsPerPage = this.elementsPerPageAccordingToRequirements;

  getCars = async () => {
    const response = await fetch(
      `${API_URL}/garage?_page=${this.carsCurrentPage()}&_limit=${this.elementsPerPage}`,
    );

    const count = Number(response.headers.get('X-Total-Count'));
    const items = (await response.json()) as Car[];

    this.carsInGarage.set(items);
    this.totalAmountofCarsInGarage.set(count);
  };
}
