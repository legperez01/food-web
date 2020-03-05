import Axios from "axios";
import Meal from "../entity/Meal";

class FoodClient {
  private static url = "http://localhost:8080/";

  private static getFoodURL() {
    return this.url + "food";
  }

  private static getMealURL() {
    return this.url + "meal";
  }

  private static getResponse(url: string, params: {}) {
    return Axios.get(url, {
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      params: params
    });
  }

  public static getFoodList() {
    return Axios.get(this.getFoodURL + "/findAll", {});
  }

  public static findFoodByName(name: string) {
    return this.getResponse(this.getFoodURL(), { name: name });
  }

  public static findFood(id: number) {
    return Axios.get(this.getFoodURL() + "/" + id);
  }

  public static createMeal(meal: Meal) {
    return Axios.post(this.getMealURL(), { meal: meal });
  }
}

export default FoodClient;
