import * as React from "react";
import Meal from "../entity/Meal";

interface IProps {
  meal: Meal;
  onAddMeal: (e: React.MouseEvent<HTMLInputElement>) => void;
}

const TableShowMeal: React.SFC<IProps> = props => {
  let table = <table />;

  if (
    props.meal.mealFoodList !== undefined &&
    props.meal.mealFoodList.length !== 0
  ) {
    table = (
      <div className="col">
        <div className="row">
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
              {props.meal.mealFoodList.map((mealFood, index) => (
                <tr key={index}>
                  <td>{mealFood.food.name}</td>
                  <td>{mealFood.amount}</td>
                  <td>{mealFood.totalCalories}</td>
                  <td>{mealFood.totalFat}</td>
                  <td>{mealFood.totalCh}</td>
                  <td>{mealFood.totalProtein}</td>
                </tr>
              ))}
              <tr key="f">
                <td className="font-weight-bold">Total</td>
                <td />
                <td className="font-weight-bold">{props.meal.totalCalories}</td>
                <td className="font-weight-bold">{props.meal.totalFat}</td>
                <td className="font-weight-bold">{props.meal.totalCh}</td>
                <td className="font-weight-bold">{props.meal.totalProtein}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="row justify-content-end">
          <input
            type="button"
            value="Add Meal"
            className="btn btn-primary"
            onClick={props.onAddMeal}
          />
        </div>
      </div>
    );
  }
  return <div>{table}</div>;
};

export default TableShowMeal;
