import React, { useState } from "react";
import Menu from "./component/header/Menu";
import TableMealList from "./component/TableMealList";
import FormDiet from "./component/FormDiet";
import TableDietList from "./component/TableDietList";
import MealForm2 from "./component/MealForm2";
import MealContextProvider from "./context/MealContext";

const App = () => {
  const [value, setValue] = useState(0);
  let content;

  switch (value) {
    case 0:
      content = <MealForm2 />;
      break;
    case 1:
      content = <TableMealList />;
      break;
    case 2:
      content = <FormDiet />;
      break;
    case 3:
      content = <TableDietList />;
      break;
  }

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <MealContextProvider>
      <div className="container col-md-10 ">
        <Menu value={value} onChange={handleChange} />
        {content}
      </div>
    </MealContextProvider>
  );
};

export default App;
