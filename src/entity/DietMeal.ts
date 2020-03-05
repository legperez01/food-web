import Diet from "./Diet";
import Meal from "./Meal";

class DietMeal {
  public id: number;
  public diet?: Diet;
  public meal: Meal;

  constructor(id: number = 0, meal: Meal = {} as Meal) {
    this.id = id;
    this.meal = meal;
  }
}

export default DietMeal;
