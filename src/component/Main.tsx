import * as React from "react";
import { Switch, Route } from "react-router-dom";
import MealForm from "./MealForm";

const Main: React.SFC = () => (
  <main>
    <Switch>
      <Route path="/" component={MealForm} />
      {/* <Route  path='/1' component={Page1}/>
        <Route  path='/2' component={Page2} />
        <Route  path='/3' component={Page3} /> */}
    </Switch>
  </main>
);

export default Main;
