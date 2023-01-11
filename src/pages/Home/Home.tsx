import React from "react";
import { Component } from "react";
import { Button } from "react-bootstrap";

import "./Home.css";


export class Home extends Component<{}> {


  public render() {
    return (
      <div
        className={"Home Page" }
      >
        <div className="Introduction">
          <div className="Name">GARRETT SIDLE</div>
          <div className="JobTitle">SOFTWARE ENGINEER</div>
          <div className="About">
            <p>
              <strong>Hello</strong>, I'm a <strong>computer science</strong>{" "}
              and
              <strong> electrical engineering </strong>
              student with a passion for <strong>technology</strong>. I'm
              excited to explore new
              <strong> opportunities</strong> in the tech industry.
            </p>
          </div>
          <div>
            <Button
              onClick={() => {
                window.location.href = "/Education"
              }}
              className="Home-Button"
            >
              See More
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
