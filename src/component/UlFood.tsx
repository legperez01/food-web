import React, { useState, useContext } from "react";
import Food from "../entity/Food";
import { MealContext } from "../context/MealContext";
import MealFood from "../entity/MealFood";

interface IUlFoodProps {
  food: Food;
}

const UlFood: React.FC<IUlFoodProps> = ({ food }) => {
  const [amount, setAmount] = useState(0);
  const { dispatch } = useContext(MealContext);

  const addMealFood = () => {
    console.log("It's working");
    if (dispatch)
      dispatch({
        type: "ADD",
        mealFood: new MealFood(amount, food)
      });
  };

  let ul = <ul />;

  if (
    food !== null &&
    food !== undefined &&
    Object.keys(food).length !== 0 &&
    food.constructor === Object
  ) {
    ul = (
      <React.Fragment>
        <ul>
          <li className="list-group-item border-0 text-left">
            <h5>Nutrition Facts</h5>
          </li>
          <li className="list-group-item border-0 text-left">
            <label className="ml-1">Amount Per: </label>
            <label className="ml-1">{food.amountPer}</label>
            <label className="ml-1">{food.unitOfAmount}</label>
          </li>
          <li className="list-group-item border-0 text-left">
            <label className="ml-1">Calories: </label>
            <label className="ml-1">{food.calories}</label>
            <label className="ml-1">g</label>
          </li>
          <li className="list-group-item border-0 text-left">
            <label className="ml-1">Total Fat: </label>
            <label className="ml-1">{food.fat}</label>
            <label className="ml-1">g</label>
          </li>
          <li className="list-group-item border-0 text-left">
            <label className="ml-1">Total Carbohydrate: </label>
            <label className="ml-1">{food.ch}</label>
            <label className="ml-1">g</label>
          </li>
          <li className="list-group-item border-0 text-left">
            <label className="ml-1">Protein: </label>
            <label className="ml-1">{food.protein}</label>
            <label className="ml-1">g</label>
          </li>
        </ul>
        <div className="form-group">
          <label htmlFor="amount">Amount of food</label>
          <input
            type="number"
            name="amount"
            className="form-control"
            onChange={e => setAmount(Number(e.target.value))}
          />
          <input
            type="button"
            value="Add Food"
            className="btn btn-primary"
            onClick={addMealFood}
          />
        </div>
      </React.Fragment>
    );
  }
  return ul;
};

export default UlFood;
