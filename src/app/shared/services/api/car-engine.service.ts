import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable, of } from 'rxjs';

import { API_URL } from '../../variables/api';

type EngineResponse = {
  velocity: number;
  distance: number;
};

@Injectable({
  providedIn: 'root',
})
export class CarEngineService {
  constructor(private http: HttpClient) {}

  startOrStopEngine(
    id: number,
    status: 'started' | 'stopped',
  ): Observable<EngineResponse> {
    return this.http.patch<EngineResponse>(
      `${API_URL}/engine/?id=${id}&status=${status}`,
      {},
    );
  }

  driveCar(id: number): Observable<boolean> {
    return this.http
      .patch<boolean>(`${API_URL}/engine?id=${id}&status=drive`, {})
      .pipe(
        map(() => true),
        catchError((error) => {
          if (error.status === 500) {
            return of(false);
          }
          return EMPTY;
        }),
      );
  }
}
