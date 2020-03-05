import axios from "axios";
import * as React from "react";
import Meal from "../entity/Meal";
import MealFood from "../entity/MealFood";
import SelectMeal from "./SelectMeal";
import Diet from "../entity/Diet";
import TableShowMeal from "./TableShowMeal";
import TableDiet from "./TableDiet";

export interface IState {
  name: string;
  selectedMeal: Meal;
  diet: Diet;
  mealList: Meal[];
}

class FormDiet extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      name: "",
      selectedMeal: new Meal(),
      diet: new Diet(),
      mealList: new Array<Meal>()
    };

    this.handleAddMeal = this.handleAddMeal.bind(this);
    this.handleChangeDietName = this.handleChangeDietName.bind(this);
    this.handleChangeMeal = this.handleChangeMeal.bind(this);
    this.handleCreateDiet = this.handleCreateDiet.bind(this);
    this.handleRemoveMeal = this.handleRemoveMeal.bind(this);
  }

  public componentDidMount() {
    axios
      .get("http://localhost:8080/meal", {
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      })
      .then(res => {
        console.log(res.data.content);
        let list = new Array<Meal>();
        list = res.data.content.map(
          (meal: Meal) =>
            new Meal(
              meal.id,
              meal.name,
              meal.mealFoodList.map(mf => new MealFood(mf.amount, mf.food))
            )
        );
        console.log(list);
        this.setState({ mealList: list });
      })
      .catch(error => {
        console.log(error);
        console.log(error.response);
      });
  }

  public handleChangeDietName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const diet = this.state.diet;
    diet.name = e.target.value;
    this.setState({
      diet
    });
  };

  public handleChangeMeal = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const meal = this.state.mealList.find(
      m => m.id === Number(e.target.value)
    ) as Meal;
    console.log(meal);
    this.setState({
      selectedMeal: meal
    });
  };

  public handleAddMeal = (e: React.MouseEvent) => {
    const diet = this.state.diet;
    diet.addMeal(this.state.selectedMeal);
    this.setState({
      diet
    });
  };

  public handleCreateDiet = (e: React.MouseEvent<HTMLInputElement>) => {
    axios
      .post("http://localhost:8080/diet", this.state.diet)
      .then(res => {
        console.log(res);
        this.setState({
          diet: new Diet(),
          selectedMeal: new Meal()
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  public handleRemoveMeal = (e: React.MouseEvent<HTMLTableCellElement>) => {
    e.preventDefault();
    const dataIndex = e.currentTarget.attributes.getNamedItem("data-index");

    if (dataIndex !== null) {
      const index = Number(dataIndex.value);
      const diet = this.state.diet;
      diet.deleteMeal(index);

      this.setState({
        diet
      });
    }
  };

  public render() {
    return (
      <div className="row align-items-start pt-5 mt-5">
        <div className="col">
          <form>
            <div className="form-group">
              <label htmlFor="name">Diet Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Diet Name"
                value={this.state.diet.name}
                onChange={this.handleChangeDietName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="meal">Select Meal</label>
              <SelectMeal
                mealList={this.state.mealList}
                onChange={this.handleChangeMeal}
              />
            </div>
            <div className="form-group">
              <TableShowMeal
                meal={this.state.selectedMeal}
                onAddMeal={this.handleAddMeal}
              />
            </div>
          </form>
        </div>
        <div className="col">
          <TableDiet
            diet={this.state.diet}
            onCreateDiet={this.handleCreateDiet}
            onRemoveMeal={this.handleRemoveMeal}
          />
        </div>
      </div>
    );
  }
}

export default FormDiet;
