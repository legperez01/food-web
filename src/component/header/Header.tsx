import * as React from "react";
import { Link } from "react-router-dom";
import CustomNavLink from "./NavLink";
import LinkData from "../../entity/Link";

interface IState {
  links: LinkData[];
}

export default class Header extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      links: [
        { path: "/1", text: "Page 1" } as LinkData,
        { path: "/2", text: "Page 2" } as LinkData,
        { path: "/3", text: "Page 3" } as LinkData
      ]
    };
  }

  public handleOnClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    console.log(e.currentTarget.href);
  };

  public render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light  bg-light">
          <Link className="navbar-brand" to="/">
            Home
          </Link>
          <ul className="navbar-nav">
            {this.state.links.map((link, index) => (
              <CustomNavLink
                path={link.path}
                text={link.text}
                isActive={link.isActive}
                key={link.path}
                onClick={this.handleOnClick}
              />
            ))}
          </ul>
        </nav>
      </div>
    );
  }
}
