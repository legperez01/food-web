import * as React from "react";
import Diet from "../entity/Diet";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

interface IProps {
  diet: Diet;
  onRemoveMeal?: (e: React.MouseEvent<HTMLTableCellElement>) => void;
  onCreateDiet?: (e: React.MouseEvent<HTMLInputElement>) => void;
}

const TableDiet: React.SFC<IProps> = props => {
  let table = <table />;

  if (
    props.diet.dietMealList !== undefined &&
    props.diet.dietMealList.length !== 0
  ) {
    table = (
      <React.Fragment>
        <div className="row">
          <h5>{props.diet.name}</h5>
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
            <tbody>
              {props.diet.dietMealList.map((dm, index) => (
                <tr key={index}>
                  <td>{dm.meal.name}</td>

                  <td>{dm.meal.totalCalories}</td>
                  <td>{dm.meal.totalFat}</td>
                  <td>{dm.meal.totalCh}</td>
                  <td>{dm.meal.totalProtein}</td>
                  {props.onRemoveMeal !== null &&
                  props.onRemoveMeal !== undefined ? (
                    <td
                      key={index}
                      onClick={props.onRemoveMeal}
                      data-index={index}
                    >
                      <IconButton color="primary" aria-label="Delete">
                        <DeleteIcon />
                      </IconButton>
                    </td>
                  ) : (
                    ""
                  )}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr key="f">
                <th>Total</th>
                <th>{props.diet.totalCalories}</th>
                <th>{props.diet.totalFat}</th>
                <th>{props.diet.totalCh}</th>
                <th>{props.diet.totalProtein}</th>
              </tr>
            </tfoot>
          </table>
        </div>
        {props.onRemoveMeal !== null && props.onRemoveMeal !== undefined ? (
          <div className="row justify-content-end">
            <input
              type="button"
              value="Create Diet"
              className="btn btn-primary"
              onClick={props.onCreateDiet}
            />
          </div>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
  return table;
};

export default TableDiet;
