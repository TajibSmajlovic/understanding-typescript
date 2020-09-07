import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export default class Model {
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsPositive()
  price: number;

  constructor(title: string, price: number) {
    this.title = title;
    this.price = price;
  }

  getInformation() {
    return this.title + " " + this.price;
  }
}
