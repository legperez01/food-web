import * as React from "react";
import Food from "../entity/Food";

export interface IFoodListProps {
  onChange: (ev: React.ChangeEvent<HTMLSelectElement>) => void;
  foodList: Food[];
}

class SelectFood extends React.Component<IFoodListProps> {
  public selectOptions = () => {
    return this.props.foodList.map(food => (
      <option key={food.id} value={JSON.stringify(food)}>
        {food.name}
      </option>
    ));
  };

  public render() {
    return (
      <select
        className="form-control"
        // key="foodList",
        name="selectedFood"
        onChange={this.props.onChange}
      >
        <option value="" />
        {this.selectOptions()}
      </select>
    );
  }
}

export default SelectFood;
