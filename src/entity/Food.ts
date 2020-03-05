import MealFood from "./MealFood";

export default class Food {
  public id: number;
  public name: string;
  public amountPer: number;
  public calories: number;
  public fat: number;
  public ch: number;
  public protein: number;
  public unitOfAmount?: string;
  public mealFoodList?: MealFood[];

  constructor(
    id = -1,
    name = "",
    amountPer = 0,
    calories = 0,
    fat = 0,
    ch = 0,
    protein = 0
  ) {
    this.id = id;
    this.name = name;
    this.amountPer = amountPer;
    this.calories = calories;
    this.fat = fat;
    this.ch = ch;
    this.protein = protein;
  }
}
