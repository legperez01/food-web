import * as React from "react";
import { Link } from "react-router-dom";

interface IProps {
  path: string;
  text: string;
  isActive: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}
const CustomNavLink: React.SFC<IProps> = props => {
  return (
    <li className={"nav-item " + (props.isActive ? "active" : "")}>
      <Link className="nav-link" to={props.path} onClick={props.onClick}>
        {props.text}
      </Link>
    </li>
  );
};

export default CustomNavLink;
