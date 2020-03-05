import React, { useState, useContext } from "react";
import Food from "../entity/Food";
import UlFood from "./UlFood";
import TableMeal from "./TableMeal";
import SearchFood from "./SearchFood";
import UlFoodList from "./UlFoodList";
import FoodClient from "../utility/FoodClient";
import { MealContext } from "../context/MealContext";

const MealForm2 = () => {
  const [foodName, setFoodName] = useState("");
  const { mealState, dispatch } = useContext(MealContext);
  const [food, setFood] = useState({} as Food);
  const [foodList, setFoodList] = useState([] as Food[]);

  const handleSearch = () => {
    FoodClient.findFoodByName(foodName)
      .then(res => {
        console.log(res);
        const data = res.data as Food[];
        console.log(data);
        setFoodList(data);
      })
      .catch(error => {
        console.log(error);
        console.log(error.response);
      });
  };

  const handleListItemClick = (foodId: number) => {
    FoodClient.findFood(foodId)
      .then(res => {
        setFood(res.data as Food);
      })
      .catch(error => {
        console.log(error);
        console.log(error.response);
      });
  };

  const handleChangeNameFood = (value: string) => {
    setFoodName(value);
  };

  const handleMealNameChange = (mealName: string) => {
    if (dispatch) {
      dispatch({ type: "CHANGE_NAME", name: mealName });
    }
  };

  return (
    <div className="row align-items-start pt-5 mt-5">
      <div className="col">
        <form>
          <div className="form-group">
            <label htmlFor="name">Meal name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Meal name"
              value={mealState?.meal.name}
              onChange={e => handleMealNameChange(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="foodList">Select a Food</label>
            <SearchFood
              foodName={foodName}
              onChange={handleChangeNameFood}
              // onKeyPress={this.handleKyePress}
              onClick={handleSearch}
            />
            <UlFoodList foodList={foodList} onClick={handleListItemClick} />
          </div>
          <div className="form-group">
            <UlFood food={food} />
          </div>
        </form>
      </div>
      <div className="col">
        <div className="form-group">
          <TableMeal />
        </div>
      </div>
    </div>
  );
};

export default MealForm2;
