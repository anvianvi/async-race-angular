import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, of } from 'rxjs';

import { API_URL } from '../../variables/api';

type DriveCarResponse = {
  success: boolean;
};

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

  driveCar(id: number): Observable<DriveCarResponse> {
    return this.http
      .patch<DriveCarResponse>(`${API_URL}/engine?id=${id}&status=drive`, {})
      .pipe(
        catchError((error) => {
          if (error.status === 500) {
            return of({ success: false });
          }
          return EMPTY;
        }),
      );
  }
}
