// export type WinnersResponse = {
//   items: Winner[];
//   count: string | null;
// };

export type StartCarResponse = {
  velocity: number;
  distance: number;
};

export type GetCarsResponse = {
  items: Car[];
  count: number;
};

export type Car = {
  name: string;
  color: string;
  id: number;
};

export type GetWinnerResponse = {
  id: number;
  wins: number;
  time: number;
};
