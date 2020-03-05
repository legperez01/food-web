import axios from "axios";
import * as React from "react";
import Meal from "../entity/Meal";
import MealFood from "../entity/MealFood";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

export interface IState {
  mealList: Meal[];
}

class TableMealList extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      mealList: new Array<Meal>()
    };
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

  public handleRemoveFood = (e: any) => {
    const dataMealId = e.currentTarget.attributes.getNamedItem("data-id");

    if (dataMealId !== null) {
      const mealId = Number(dataMealId.value);
      console.log(mealId);
      const mealList = this.state.mealList.filter(m => m.id !== mealId);

      axios.delete("http://localhost:8080/meal/" + mealId, {
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      }).then(res => {
        console.log(res.data.content);
        this.setState({
          mealList
        });
      })
      .catch(error => {
        console.log(error);
        console.log(error.response);
      });

      
    }
  };

  public render() {
    let tableContent;

    if (this.state.mealList != null) {
      tableContent = this.state.mealList.map((m, index) => (
        <tr key={index}>
          <td>{m.name}</td>

          <td>{m.totalCalories}</td>
          <td>{m.totalFat}</td>
          <td>{m.totalCh}</td>
          <td>{m.totalProtein}</td>
          <td key={index} onClick={this.handleRemoveFood} data-id={m.id}>
            <IconButton color="primary" aria-label="Delete">
              <DeleteIcon />
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
          <React.Fragment>
            <h5>Meal List</h5>
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
          </React.Fragment>
        </div>
      </div>
    );
  }
}

export default TableMealList;
