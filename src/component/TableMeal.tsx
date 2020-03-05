import React, { useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { MealContext } from "../context/MealContext";
import MealFood from "../entity/MealFood";
import FoodClient from "../utility/FoodClient";

const TableMeal = () => {
  const { mealState, dispatch } = useContext(MealContext);

  const handleDeleteMeal = (index: number) => {
    if (dispatch) dispatch({ type: "DELETE", index: index });
  };

  const handleCreateMeal = () => {
    if (mealState?.meal) {
      FoodClient.createMeal(mealState.meal)
        .then(res => {
          console.log(res);
          if (dispatch) dispatch({ type: "SAVE" });
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  let table = <table />;

  if (
    mealState &&
    mealState.meal.mealFoodList !== undefined &&
    mealState.meal.mealFoodList.length !== 0
  ) {
    table = (
      <>
        <h5>{mealState.meal.name}</h5>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Amount</th>
              <th scope="col">Total Calories</th>
              <th scope="col">Total Fat</th>
              <th scope="col">Total Carbohydrate</th>
              <th scope="col">Total Protein</th>
            </tr>
          </thead>
          <tbody>
            {mealState.meal.mealFoodList.map(
              (mealFood: MealFood, index: number) => (
                <tr key={index}>
                  <td>{mealFood.food.name}</td>
                  <td>{mealFood.amount}</td>
                  <td>{mealFood.totalCalories}</td>
                  <td>{mealFood.totalFat}</td>
                  <td>{mealFood.totalCh}</td>
                  <td>{mealFood.totalProtein}</td>
                  <td key={index} onClick={e => handleDeleteMeal(index)}>
                    <IconButton color="primary" aria-label="Delete">
                      <DeleteIcon />
                    </IconButton>
                  </td>
                </tr>
              )
            )}
            <tr key="f">
              <td className="font-weight-bold">Total</td>
              <td />
              <td className="font-weight-bold">
                {mealState.meal.totalCalories}
              </td>
              <td className="font-weight-bold">{mealState.meal.totalFat}</td>
              <td className="font-weight-bold">{mealState.meal.totalCh}</td>
              <td className="font-weight-bold">
                {mealState.meal.totalProtein}
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <input
            type="button"
            value="Create Meal"
            className="btn btn-primary"
            onClick={handleCreateMeal}
          />
        </div>
      </>
    );
  }
  return <div>{table}</div>;
};

export default TableMeal;
