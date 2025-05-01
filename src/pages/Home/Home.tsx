import { Component } from "react";

import "./Home.css";


export class Home extends Component<{}> {


  public render() {
    return (
      <div className="Home Page" id='Home'>
        <div className="Introduction">
          <div className="Name">GARRETT SIDLE</div>
          <div className="JobTitle">SOFTWARE ENGINEER</div>
          <div className="About">
            <p>
              <strong>Hello</strong>, I'm a <strong>Software Engineer</strong>{" "}
              with a passion for <strong>technology</strong>. I'm
              excited to explore new
              <strong> opportunities</strong> in the tech industry.
            </p>
          </div>
          <div>
            <button
              onClick={() => {
                window.location.href = "#Education";
              }}
              className="Home-Button"
            >
              See More
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
