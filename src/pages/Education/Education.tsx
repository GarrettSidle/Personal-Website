import { Component } from "react";

import "./Education.css";
import Header from "../../components/Header/Header";

const Northwest = require("../../assets/Northwest.png")
const Miami = require("../../assets/Miami.png")


export class Education extends Component<{}> {
  private card(
    header: string,
    subHeader: string,
    dates: string,
    link: string,
    img: any,
    className:string
  ) {
    return (
      <div className={`Card ${className}`}>
        <a href={link} target="_blank" style={{ textDecoration: "none" }}>
          <div >
            <img className="Card-Logo" src={img} />
          </div>
          <div className="Card-Header">{header}</div>
          <hr className="Edu-HR"/>
          <div className="Card-SubHeader">{subHeader}</div>

          <div className="Card-Dates">{dates}</div>
        </a>
      </div>
    );
  }

  public render() {
    return (
      <div className="Edu-Shell Page" id='Education'>
        <Header>My Education</Header>
        <div className="Education">
          {this.card(
              "Bachelor's: Electrical and Computer Engineering",
              "Miami University of Ohio",
              "Aug 2023 – May 2025",
              "https://programs.miamioh.edu/programs/electrical-computer-engineering-technology-bs/",
              Miami,
              "Miami"
            )}
        <div className="Cards">
          <div className="col">
            {this.card(
              "Associate's: Electro-Mechanical Engineering",
              "Northwest State Community College",
              "Aug 2021 – Nov 2023",
              "https://northweststate.edu/electro-mechanical-engineering-technology",
              Northwest,
              "Northwest"
            )}
          </div>
          <div className="col">
            {this.card(
            "Associate's: Computer Science Engineering",
              "Northwest State Community College",
              "Aug 2021 – May 2023",
              "https://northweststate.edu/computer-science-engineering-technology",
              Northwest,
              "Northwest"
            )}
          </div>
        </div>
        </div>
      </div>
    );
  }
}
export default Education;
