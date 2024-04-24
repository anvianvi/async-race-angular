import { Injectable } from '@angular/core';

export type CarTemplate = {
  name: string;
  color: string;
};

@Injectable({
  providedIn: 'root',
})
export class RandomGeneratorsService {
  getRandomCarName = (): string => {
    const name = this.names[Math.floor(Math.random() * this.names.length)];
    const model = this.models[Math.floor(Math.random() * this.models.length)];
    return `${name} ${model}`;
  };

  getRandomColor(): string {
    let color = '#';
    for (let i = 0; i < 6; i += 1) {
      color += this.symbols[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  getRandomCarTemplate(countCars: number): CarTemplate[] {
    return Array.from({ length: countCars }, () => ({
      name: this.getRandomCarName(),
      color: this.getRandomColor(),
    }));
  }

  symbols = '0123456789ABCDEF';

  names: string[] = [
    'Porshe',
    'Tesla',
    'Kia',
    'Peugeot',
    'Honda',
    'Jaguar',
    'Mazda',
    'Volvo',
    'MINI',
    'Toyota',
    'SomeSuperFast',
    'Audi',
    'BMW',
    'Mercedes-Benz',
    'Ford',
    'Chevrolet',
    'Nissan',
    'Hyundai',
    'Subaru',
    'Lamborghini',
  ];

  models: string[] = [
    '911',
    'Model Y',
    'Seltos',
    '206',
    'CR-V',
    'F-PACE',
    'CX-5',
    'XC60',
    '3-door',
    'Corolla',
    'SuperCar',
    'A8',
    'X5',
    'S-Class',
    'Mustang',
    'Camaro',
    'GT-R',
    'Elantra',
    'Outback',
    'Aventador',
  ];
}
