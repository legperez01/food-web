import axios from "axios";
import * as React from "react";
import Meal from "../entity/Meal";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Diet from "../entity/Diet";
import DietMeal from "../entity/DietMeal";
import MealFood from "../entity/MealFood";
import { Visibility } from "@material-ui/icons";
import TableDiet from "./TableDiet";

export interface IState {
  dietList: Diet[];
  selectedDiet: Diet;
}

class TableDietList extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      dietList: new Array<Diet>(),
      selectedDiet: new Diet()
    };
  }

  public componentDidMount() {
    axios
      .get("http://localhost:8080/diet", {
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      })
      .then(res => {
        console.log(res.data.content);
        let list = new Array<Diet>();
        list = res.data.content.map(
          (diet: Diet) =>
            new Diet(
              diet.id,
              diet.name,
              diet.dietMealList.map(
                dm =>
                  new DietMeal(
                    dm.id,
                    new Meal(
                      dm.meal.id,
                      dm.meal.name,
                      dm.meal.mealFoodList.map(
                        mf => new MealFood(mf.amount, mf.food)
                      )
                    )
                  )
              )
            )
        );
        console.log(list);
        this.setState({ dietList: list });
      })
      .catch(error => {
        console.log(error);
        console.log(error.response);
      });
  }

  public handleRemoveDiet = (e: any) => {
    const dataDietId = e.currentTarget.attributes.getNamedItem("data-id");

    if (dataDietId !== null) {
      const dietId = Number(dataDietId.value);
      console.log(dietId);
      const dietList = this.state.dietList.filter(d => d.id !== dietId);

      axios
        .delete("http://localhost:8080/diet/" + dietId, {
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          }
        })
        .then(res => {
          console.log(res.data.content);
          this.setState({
            dietList
          });
        })
        .catch(error => {
          console.log(error);
          console.log(error.response);
        });
    }
  };

  public handleViewDiet = (e: any) => {
    const dataDietId = e.currentTarget.attributes.getNamedItem("data-id");

    if (dataDietId !== null) {
      const dietId = Number(dataDietId.value);
      console.log(dietId);
      const selectedDiet = this.state.dietList.find(
        d => d.id === dietId
      ) as Diet;
      this.setState({
        selectedDiet
      });
    }
  };

  public render() {
    let tableContent;

    if (this.state.dietList != null) {
      tableContent = this.state.dietList.map((d, index) => (
        <tr key={index}>
          <td>{d.name}</td>

          <td>{d.totalCalories}</td>
          <td>{d.totalFat}</td>
          <td>{d.totalCh}</td>
          <td>{d.totalProtein}</td>
          <td key={index} onClick={this.handleRemoveDiet} data-id={d.id}>
            <IconButton color="primary" aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </td>
          <td key={index} onClick={this.handleViewDiet} data-id={d.id}>
            <IconButton color="primary" aria-label="Delete">
              <Visibility />
            </IconButton>
          </td>
        </tr>
      ));
    } else {
      tableContent = <tr />;
    }

    return (
      <div className="row pt-5 mt-5">
        <div className="col">
          <h5>Diet List</h5>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Total Calories</th>
                <th scope="col">Total Fat</th>
                <th scope="col">Total Carbohydrate</th>
                <th scope="col">Total Protein</th>
              </tr>
            </thead>
            <tbody>{tableContent}</tbody>
          </table>
        </div>
        <div className="col">
          <TableDiet diet={this.state.selectedDiet} />
        </div>
      </div>
    );
  }
}

export default TableDietList;
