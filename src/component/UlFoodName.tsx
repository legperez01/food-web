import * as React from "react";
import Food from "../entity/Food";

interface IProps {
  foodList: Food[];
  onClick: (id: number) => void;
}

const UlFoodName: React.SFC<IProps> = props => {
  const foodList = props.foodList.map(food => (
    <li
      id={food.id.toString()}
      key={food.id}
      onClick={() => props.onClick(food.id)}
    >
      {food.name}
    </li>
  ));

  return <ul>{foodList}</ul>;
};

export default UlFoodName;
