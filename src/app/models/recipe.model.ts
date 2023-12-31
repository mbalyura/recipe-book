import { Ingridient } from "./ingridient.model";

export class Recipe {
  public name: string;
  public description: string;
  public imagePath: string;
  public ingridients: Ingridient[];

  constructor(name: string, description: string, imagePath: string, ingridients: Ingridient[]) {
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.ingridients = ingridients;
  }
}