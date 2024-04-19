export type Car = {
  name: string;
  color: string;
  id: number;
};
export type GetCarsResponse = {
  items: Car[];
  count: number;
};

export type AnimationState = {
  id: number;
};
