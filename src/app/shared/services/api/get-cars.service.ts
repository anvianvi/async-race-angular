import { Injectable, signal } from '@angular/core';

import { API_URL } from '../../variables/api';
import { Car } from './api-types';

@Injectable({
  providedIn: 'root',
})
export class GetCarsService {
  carsInGarage = signal<Car[] | []>([]);
  totalAmountofCarsInGarage = signal<number>(0);

  getCars = async (
    currentPageNumber: number = 1,
    elementsPerPage: number = 7,
  ) => {
    const response = await fetch(
      `${API_URL}/garage?_page=${currentPageNumber}&_limit=${elementsPerPage}`,
    );

    const count = Number(response.headers.get('X-Total-Count'));
    const items = (await response.json()) as Car[];

    this.carsInGarage.set(items);
    this.totalAmountofCarsInGarage.set(count);
  };
}
