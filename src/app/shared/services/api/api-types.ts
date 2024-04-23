// export type WinnersResponse = {
//   items: Winner[];
//   count: string | null;
// };

import { Car } from '../../types';

export type StartCarResponse = {
  velocity: number;
  distance: number;
};

export type GetCarsResponse = {
  items: Car[];
  count: number;
};
