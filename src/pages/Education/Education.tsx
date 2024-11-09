import React from "react";
import { Component } from "react";
import { Col, Row } from "react-bootstrap";

import "./Education.css";
import Header from "../../components/Header/Header";


export class Education extends Component<{}> {
  private card(
    header: string,
    subHeader: string,
    dates: string,
    link: string,
    imgPath: string,
    className:string
  ) {
    return (
      <div className={`Card ${className}`}>
        <a href={link} target="_blank" style={{ textDecoration: "none" }}>
          <div >
            <img className="Card-Logo" src={`${imgPath}`} />
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
      <div className="Edu-Shell Page">
        <Header>My Education</Header>
        <div className="Education">
          {this.card(
              "Bachelor's: Electrical and Computer Engineering",
              "Miami University of Ohio",
              "Aug 2023 – May 2025",
              "https://programs.miamioh.edu/programs/electrical-computer-engineering-technology-bs/",
              "Miami.png",
              "Miami"
            )}
        <div className="Cards">
          <div className="col">
            {this.card(
              "Associate's: Electro-Mechanical Engineering",
              "Northwest State Community College",
              "Aug 2021 – Nov 2023",
              "https://northweststate.edu/electro-mechanical-engineering-technology",
              "Northwest.svg",
              "Northwest"
            )}
          </div>
          <div className="col">
            {this.card(
            "Associate's: Computer Science Engineering",
              "Northwest State Community College",
              "Aug 2021 – May 2023",
              "https://northweststate.edu/computer-science-engineering-technology",
              "Northwest.svg",
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
