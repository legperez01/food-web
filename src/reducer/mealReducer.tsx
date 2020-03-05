import Meal from "../entity/Meal";
import MealFood from "../entity/MealFood";

export type MealState = {
  meal: Meal;
};

type ADD = {
  readonly type: "ADD";
  readonly mealFood: MealFood;
};

type DELETE = {
  readonly type: "DELETE";
  readonly index: number;
};

type RESET = {
  readonly type: "RESET";
};

type SAVE = {
  readonly type: "SAVE";
};

type CHANGE_NAME = {
  readonly type: "CHANGE_NAME";
  readonly name: string;
};

export type Action = ADD | DELETE | SAVE | RESET | CHANGE_NAME;

function mealReducer(state: MealState, action: Action): MealState {
  switch (action.type) {
    case "ADD":
      return {
        meal: new Meal(state.meal.id, state.meal.name, [
          ...state.meal.mealFoodList,
          action.mealFood
        ])
      };

    case "DELETE":
      return {
        meal: new Meal(
          state.meal.id,
          state.meal.name,
          state.meal.mealFoodList.filter((mf, i) => i !== Number(action.index))
        )
      };

    case "CHANGE_NAME":
      return {
        meal: new Meal(state.meal.id, action.name, [...state.meal.mealFoodList])
      };

    case "RESET":
      return { meal: new Meal() };

    default:
      return state;
  }
}

export default mealReducer;
