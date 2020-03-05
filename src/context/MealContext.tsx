import React, { createContext, useReducer, FC } from "react";
import Meal from "../entity/Meal";
import mealReducer, { MealState, Action } from "../reducer/mealReducer";

interface IProps {
  mealState: MealState;
  dispatch: React.Dispatch<Action>;
}

const initialState: MealState = {
  meal: new Meal()
};

export const MealContext = createContext<Partial<IProps>>({});

const MealContextProvider: FC<Partial<IProps>> = props => {
  const [mealState, dispatch] = useReducer(mealReducer, initialState);

  return (
    <MealContext.Provider value={{ mealState, dispatch }}>
      {props.children}
    </MealContext.Provider>
  );
};

export default MealContextProvider;
