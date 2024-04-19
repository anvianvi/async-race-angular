import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { API_URL } from '../../variables/api';
import { StartCarResponse } from './api-types';

@Injectable({
  providedIn: 'root',
})
export class CarEngineService {
  constructor(private http: HttpClient) {}

  startCar(id: number): Observable<StartCarResponse> {
    return this.http
      .patch<StartCarResponse>(`${API_URL}/engine?id=${id}&status=started`, {})
      .pipe(
        catchError((error) => {
          throw new Error(`Error starting car with ID ${id}: ${error}`);
        }),
      );
  }

  stopCar(id: number): Observable<void> {
    return this.http
      .patch<void>(`${API_URL}/engine?id=${id}&status=stopped`, {})
      .pipe(
        catchError((error) => {
          throw new Error(`Error stopping car with ID ${id}: ${error}`);
        }),
      );
  }

  driveCar(id: number): Observable<boolean> {
    return this.http
      .patch<boolean>(`${API_URL}/engine?id=${id}&status=drive`, {})
      .pipe(
        catchError((error) => {
          throw new Error(`Error driving car with ID ${id}:`, error);
        }),
      );
  }
}
