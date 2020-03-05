import axios from "axios";
import React from "react";
import Food from "../entity/Food";
// import SelectFood from "./SelectFood";
import MealFood from "../entity/MealFood";
// import UlFood from "./UlFood";
// import TableMeal from "./TableMeal";
import Meal from "../entity/Meal";
// import { Search } from "@material-ui/icons";
// import SearchFood from "./SearchFood";
import UlFoodList from "./UlFoodList";
import FoodClient from "../utility/FoodClient";
// import UlFoodName from "./UlFoodName";

interface IState {
  name: string;
  foodName: string;
  amount: number;
  food: Food;
  mealFood: MealFood;
  mealFoodList: MealFood[];
  foodList: Food[];
  meal: Meal;
}

class MealForm extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      name: "",
      foodName: "",
      amount: 30,
      food: new Food(),
      meal: new Meal(),
      mealFood: new MealFood(),
      mealFoodList: new Array<MealFood>(),
      foodList: new Array<Food>()
    };
  }

  // public componentDidMount() {
  //   axios
  //     .get("http://localhost:8080/food/findAll", {
  //       headers: {
  //         "Content-Type": "application/json; charset=utf-8"
  //       }
  //       // params: {page: 0}
  //     })
  //     .then(res => {
  //       console.log(res.data.content);
  //       this.setState({ foodList: res.data.content });
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       console.log(error.response);
  //     });
  // }

  public handleChangeMealName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const meal = this.state.meal;
    meal.name = e.target.value;
    this.setState({
      meal
    });
  };

  public handleChangeNameFood = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    this.setState({
      foodName: name
    });
  };

  public handleChangeFood = (e: any) => {
    this.setState({
      food: JSON.parse(e.target.value)
    });
  };

  public handleChangeAmountFood = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      amount: Number(e.target.value)
    });
  };

  public handleAddMealFood = (e: React.MouseEvent) => {
    e.preventDefault();
    const m = new Meal(0, this.state.meal.name, this.state.meal.mealFoodList);
    m.addFood(this.state.food, this.state.amount);
    this.setState({
      meal: m
    });
  };

  public handleCreateMeal = (e: React.MouseEvent<HTMLInputElement>) => {
    axios
      .post("http://localhost:8080/meal", this.state.meal)
      .then(res => {
        console.log(res);
        this.setState({
          meal: new Meal(),
          food: new Food()
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  public handleRemoveFood = (e: React.MouseEvent<HTMLTableCellElement>) => {
    e.preventDefault();
    const dataIndex = e.currentTarget.attributes.getNamedItem("data-index");

    if (dataIndex !== null) {
      const index = Number(dataIndex.value);
      const m = this.state.meal;
      m.deleteFood(index);

      this.setState({
        meal: m
      });
    }
  };

  public handleKyePress = (e: React.KeyboardEvent) => {
    e.preventDefault();
    if (e.key === "Enter") {
      return;
    }
  };

  public handleSearch = (e: React.MouseEvent) => {
    const foodName = this.state.foodName;
    console.log(foodName);
    FoodClient.findFoodByName(foodName)
      .then(res => {
        console.log(res);
        const data = res.data as Food[];
        console.log(data);
        this.setState({ foodList: data });
      })
      .catch(error => {
        console.log(error);
        console.log(error.response);
      });
  };

  public handleListItemClick = (foodId: number) => {
    // const food = this.state.foodList.find(food => (food.id = foodId)) as Food;
    FoodClient.findFood(foodId)
      .then(res => {
        const food = res.data as Food;
        this.setState({
          food: food
        });
      })
      .catch(error => {
        console.log(error);
        console.log(error.response);
      });

    console.log("click!!!!!: " + foodId);
  };

  public render() {
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
                value={this.state.meal.name}
                onChange={this.handleChangeMealName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="foodList">Select a Food</label>
              {/* <SearchFood
                foodName={this.state.foodName}
                onChange={this.handleChangeNameFood}
                // onKeyPress={this.handleKyePress}
                onClick={this.handleSearch}
              /> */}
              <UlFoodList
                foodList={this.state.foodList}
                onClick={this.handleListItemClick}
              />
            </div>
            <div className="form-group">
              {/* <UlFood
                food={this.state.food}
                onClick={this.handleAddMealFood}
                onChange={this.handleChangeAmountFood}
              /> */}
            </div>
          </form>
        </div>
        <div className="col">
          <div className="form-group">
            {/* <TableMeal
              meal={this.state.meal}
              onCreateMeal={this.handleCreateMeal}
              handleRemoveFood={this.handleRemoveFood}
            /> */}
          </div>
        </div>
      </div>
    );
  }
}

export default MealForm;
