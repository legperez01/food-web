import DietMeal from "./DietMeal";
import Meal from "./Meal";

class Diet {
  public id: number;
  public name: string;
  public dietMealList: DietMeal[];

  constructor(
    id: number = 0,
    name: string = "",
    dietMealList: DietMeal[] = new Array<DietMeal>()
  ) {
    this.id = id;
    this.name = name;
    this.dietMealList = dietMealList;
  }

  get totalCalories(): number {
    return this.dietMealList
      .map(dm => dm.meal.totalCalories)
      .reduce((prev, actual) => Number((prev + actual).toFixed(1)));
  }

  get totalFat(): number {
    return this.dietMealList
      .map(mf => mf.meal.totalFat)
      .reduce((prev, actual) => Number((prev + actual).toFixed(1)));
  }

  get totalCh(): number {
    return this.dietMealList
      .map(mf => mf.meal.totalCh)
      .reduce((prev, actual) => Number((prev + actual).toFixed(1)));
  }

  get totalProtein(): number {
    return this.dietMealList
      .map(mf => mf.meal.totalProtein)
      .reduce((prev, actual) => Number((prev + actual).toFixed(1)));
  }

  public addMeal(meal: Meal) {
    const dietMeal = new DietMeal();
    dietMeal.meal = meal;
    this.dietMealList = [...this.dietMealList, dietMeal];
  }

  public deleteMeal(index: number) {
    this.dietMealList = this.dietMealList.filter(
      (dm, i) => i !== Number(index)
    );
  }
}

export default Diet;
