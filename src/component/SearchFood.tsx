import * as React from "react";
import SearchIcon from "@material-ui/icons/Search";

import "../SearchFood.css";
import { IconButton } from "@material-ui/core";

interface IProps {
  foodName: string;
  onClick: () => void;
  onChange: (value: string) => void;
  // onKeyPress: (e: React.KeyboardEvent) => void;
}

const SearchFood: React.SFC<IProps> = props => {
  return (
    <div className="divSearch">
      <input
        type="text"
        value={props.foodName}
        onChange={e => props.onChange(e.target.value)}
        placeholder="Search…"
        className="inputSearch"
      />
      <div className="IconSearch">
        <IconButton aria-label="search" onClick={props.onClick}>
          <SearchIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default SearchFood;
