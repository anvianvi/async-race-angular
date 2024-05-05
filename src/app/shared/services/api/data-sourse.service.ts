import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataSourseService {
  API_URL = signal('https://flint-brazen-catshark.glitch.me');
  // API_URL = signal('http://127.0.0.1:3000');
}
