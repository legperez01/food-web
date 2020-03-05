import * as React from "react";
import Meal from "../entity/Meal";

interface IProps {
  mealList: Meal[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectMeal: React.SFC<IProps> = props => {
  return (
    <select className="form-control" name="meal" onChange={props.onChange}>
      <option />
      {props.mealList.map(m => (
        <option key={m.id} value={m.id}>
          {m.name}
        </option>
      ))}
    </select>
  );
};

export default SelectMeal;
