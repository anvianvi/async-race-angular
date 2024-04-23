import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
      .pipe();
  }

  stopCar(id: number): Observable<void> {
    return this.http
      .patch<void>(`${API_URL}/engine?id=${id}&status=stopped`, {})
      .pipe();
  }

  driveCar(id: number): Observable<boolean> {
    return this.http
      .patch<boolean>(`${API_URL}/engine?id=${id}&status=drive`, {})
      .pipe(
        catchError((error) => {
          if (error.status === 500) {
            return of(false);
          }
          return of(true);
        }),
      );
  }
}
