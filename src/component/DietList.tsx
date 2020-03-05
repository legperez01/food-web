import * as React from "react";
import Diet from "../entity/Diet";
import axios from "axios";

interface IState {
  dietList: Diet[];
}

class ListDiet extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      dietList: []
    };
  }

  public componentDidMount() {
    axios
      .get("http://localhost:8080/diet", {
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      })
      .then(res => {
        console.log(res.data.content);
        this.setState({ dietList: res.data.content });
      })
      .catch(error => {
        console.log(error);
        console.log(error.response);
      });
  }

  public render() {
    return (
      <ul className="list-group">
        {this.state.dietList.map((diet: Diet) => (
          <li className="list-group-item">{diet.name}</li>
        ))}
      </ul>
    );
  }
}

export default ListDiet;
