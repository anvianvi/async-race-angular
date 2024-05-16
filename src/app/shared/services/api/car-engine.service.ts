import { HttpClient } from '@angular/common/http';
import { computed, Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable, of } from 'rxjs';

import { DataSourseService } from './data-sourse.service';

type EngineResponse = {
  velocity: number;
  distance: number;
};

@Injectable({
  providedIn: 'root',
})
export class CarEngineService {
  API_URL = computed(() => {
    return this.dataSourseService.API_URL();
  });

  constructor(
    private http: HttpClient,
    private dataSourseService: DataSourseService,
  ) {}

  startOrStopEngine(
    id: number,
    status: 'started' | 'stopped',
  ): Observable<EngineResponse> {
    return this.http.patch<EngineResponse>(
      `${this.API_URL()}/engine/?id=${id}&status=${status}`,
      {},
    );
  }

  driveCar(id: number): Observable<boolean> {
    return this.http
      .patch<boolean>(`${this.API_URL()}/engine?id=${id}&status=drive`, {})
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
