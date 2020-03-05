import React, { Component } from "react";

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="#">
          MealPreping
        </a>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Meal List
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Create Meal
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Calory Calculator
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Macro Calculator
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
