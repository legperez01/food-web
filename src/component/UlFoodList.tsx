import React from "react";
import Food from "../entity/Food";
import { List, ListItem, ListItemText } from "@material-ui/core";

interface IProps {
  foodList: Food[];
  onClick: (id: number) => void;
}

const UlFoodList: React.FC<IProps> = props => {
  return (
    <List component="nav">
      {props.foodList.length !== null &&
        props.foodList.length !== undefined &&
        props.foodList.length !== 0 &&
        props.foodList.map(food => (
          <ListItem
            button
            key={food.id}
            id={food.id.toString()}
            onClick={() => props.onClick(food.id)}
          >
            <ListItemText primary={food.name} />
          </ListItem>
        ))}
    </List>
  );
};

export default UlFoodList;
