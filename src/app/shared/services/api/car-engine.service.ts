import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_URL } from '../../variables/api';

type CarDriveResponse = {
  success: boolean;
};

type CarRaceStatsResponse = {
  velocity: number;
  distance: number;
};

@Injectable({
  providedIn: 'root',
})
export class CarEngineService {
  constructor(private http: HttpClient) {}

  static startCar = async (id: number): Promise<CarRaceStatsResponse> => {
    try {
      const response = await fetch(
        `${API_URL}/engine?id=${id}&status=started`,
        {
          method: 'PATCH',
        },
      );
      return (await response.json()) as CarRaceStatsResponse;
    } catch (error) {
      throw new Error(`Error starting car with ID ${id}: ${error}`);
    }
  };

  stopCar(id: number): Observable<void> {
    return this.http
      .patch<void>(`${API_URL}/engine?id=${id}&status=stopped`, {})
      .pipe();
  }

  static async driveCar(id: number): Promise<CarDriveResponse> {
    try {
      const response = await fetch(`${API_URL}/engine?id=${id}&status=drive`, {
        method: 'PATCH',
      });
      return { ...(await response.json()), success: true };
    } catch (error) {
      return { success: false };
    }
  }
}
