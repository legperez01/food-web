import { AppBar, Tabs, Tab } from "@material-ui/core";
import * as React from "react";

export interface IProps {
  value: number;
  onChange: (event: React.ChangeEvent<{}>, value: number) => void;
}

const Menu: React.FC<IProps> = props => {
  return (
    <div className="row align-items-start pb-5 mb-5">
      <AppBar className="col p-0 m-0" position="absolute">
        <Tabs
          className="col"
          value={props.value}
          onChange={props.onChange}
          centered
        >
          <Tab label="Create a Meal" />
          <Tab label="Meal List" />
          <Tab label="Create Diet" />
          <Tab label="Diet List" />
          <Tab label="Current Diet" />
        </Tabs>
      </AppBar>
    </div>
  );
};

export default Menu;
