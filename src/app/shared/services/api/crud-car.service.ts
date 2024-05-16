import { HttpClient } from '@angular/common/http';
import { computed, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CarTemplate } from '../random-generators.service';
import { Car } from './api-types';
import { DataSourseService } from './data-sourse.service';

@Injectable({
  providedIn: 'root',
})
export class CrudCarService {
  API_URL = computed(() => {
    return this.dataSourseService.API_URL();
  });

  constructor(
    private http: HttpClient,
    private dataSourseService: DataSourseService,
  ) {}

  getCar(id: number): Observable<Car> {
    return this.http.get<Car>(`${this.API_URL()}/garage/${id}`);
  }

  createCar(body: CarTemplate): Observable<Car> {
    return this.http.post<Car>(`${this.API_URL()}/garage`, body, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  updateCar(body: CarTemplate, id: number): Observable<Car> {
    return this.http.put<Car>(`${this.API_URL()}/garage/${id}`, body, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  deleteCar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL()}/garage/${id}`, {}).pipe();
  }
}
