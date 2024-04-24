import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_URL } from '../../variables/api';
import { CarTemplate } from '../random-generators.service';
import { Car } from './api-types';

@Injectable({
  providedIn: 'root',
})
export class CrudCarService {
  constructor(private http: HttpClient) {}

  createCar(body: CarTemplate): Observable<Car> {
    return this.http
      .post<Car>(`${API_URL}/garage`, body, {
        headers: { 'Content-Type': 'application/json' },
      })
      .pipe();
  }

  updateCar(body: CarTemplate, id: number): Observable<Car> {
    return this.http
      .put<Car>(`${API_URL}/garage/${id}`, body, {
        headers: { 'Content-Type': 'application/json' },
      })
      .pipe();
  }

  deleteCar(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/garage/${id}`, {}).pipe();
  }
}
