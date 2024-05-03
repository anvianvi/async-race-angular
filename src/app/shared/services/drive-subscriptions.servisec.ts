import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DriveSubscriptionsService {
  private subscriptions: Map<number, Subscription> = new Map<
    number,
    Subscription
  >();

  add(carId: number, subscription: Subscription) {
    this.subscriptions.set(carId, subscription);
  }

  unsubscribe(carId: number) {
    const subscription = this.subscriptions.get(carId);
    if (subscription) {
      subscription.unsubscribe();
      this.subscriptions.delete(carId);
    }
  }

  unsubscribeAll() {
    Object.keys(this.subscriptions).forEach((carId) => {
      this.unsubscribe(Number(carId));
    });
  }
}
