import Food from "./Food";
import Meal from "./Meal";

export default class MealFood {
  public mealFoodId?: number;
  public food: Food;
  public meal: Meal;
  public amount: number;

  constructor(
    amount: number = 10,
    food: Food = {} as Food,
    meal: Meal = {} as Meal
  ) {
    this.amount = amount;
    this.food = food;
    this.meal = meal;
  }

  get totalCalories(): number {
    return parseFloat((this.serviceSize * this.food.calories).toFixed(1));
  }

  get serviceSize(): number {
    return parseFloat((this.amount / this.food.amountPer).toFixed(1));
  }

  get totalFat(): number {
    return parseFloat((this.serviceSize * this.food.fat).toFixed(1));
  }

  get totalCh(): number {
    return parseFloat((this.serviceSize * this.food.ch).toFixed(1));
  }

  get totalProtein(): number {
    return parseFloat((this.serviceSize * this.food.protein).toFixed(1));
  }
}
