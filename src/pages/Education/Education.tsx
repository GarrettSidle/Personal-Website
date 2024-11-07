import React from "react";
import { Component } from "react";
import { Col, Row } from "react-bootstrap";

import "./Education.css";


export class Education extends Component<{}> {
  private card(
    header: string,
    subHeader: string,
    dates: string,
    BGcolor: string,
    link: string,
    imgPath: string
  ) {
    return (
      <div className={`Card ${imgPath}`}>
        <a href={link} target="_blank" style={{ textDecoration: "none" }}>
          <div className="Card-Logo">
            <img src={`${imgPath}.png`} />
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
        <div className="Education">
          {this.card(
              "Bachelor's: Electrical and Computer Engineering Technology ",
              "Miami University of Ohio",
              "Aug 2023 – May 2025",
              "#c41230",
              "https://miamioh.edu/regionals/academics/departments/ent/admission/transfer-and-articulations/ecet/northwest-state-sem/index.html",
              "Miami"
            )}
        <div className="Cards">
          <div className="col">
            {this.card(
              "Associate's: Electro-Mechanical Engineering Technology",
              "Northwest State Community College",
              "Aug 2021 – Nov 2023",
              "#008030",
              "https://northweststate.edu/wp-content/uploads/files/20.02ElectroMechancial.pdf",
              "Northwest"
            )}
          </div>
          <div className="col">
            {this.card(
            "Associate's: Computer Science Engineering Technology",
              "Northwest State Community College",
              "Aug 2021 – May 2023",
              "#008030",
              "https://northweststate.edu/wp-content/uploads/files/20.6-Computer-Science-Eng-Tech.pdf",
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
