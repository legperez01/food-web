import MealFood from "./MealFood";
import Food from "./Food";

export default class Meal {
  public id: number;
  public name: string;
  public mealFoodList: MealFood[];

  constructor(
    id: number = -1,
    name: string = "",
    mealFoodList: MealFood[] = new Array<MealFood>()
  ) {
    this.id = id;
    this.name = name;
    this.mealFoodList = mealFoodList;
  }

  get totalCalories(): number {
    return this.mealFoodList
      .map(mf => mf.totalCalories)
      .reduce((prev, actual) => Number((prev + actual).toFixed(1)));
  }

  get totalFat(): number {
    return this.mealFoodList
      .map(mf => mf.totalFat)
      .reduce((prev, actual) => Number((prev + actual).toFixed(1)));
  }

  get totalCh(): number {
    return this.mealFoodList
      .map(mf => mf.totalCh)
      .reduce((prev, actual) => Number((prev + actual).toFixed(1)));
  }

  get totalProtein(): number {
    return this.mealFoodList
      .map(mf => mf.totalProtein)
      .reduce((prev, actual) => Number((prev + actual).toFixed(1)));
  }

  public addFood(food: Food, amount: number) {
    const mealFood = new MealFood(amount, food);
    this.mealFoodList = [...this.mealFoodList, mealFood];
  }

  public deleteFood(index: number) {
    this.mealFoodList = this.mealFoodList.filter(
      (mf, i) => i !== Number(index)
    );
  }
}
