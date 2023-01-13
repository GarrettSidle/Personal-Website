import React from "react";
import { Component } from "react";
import { Col, Row } from "react-bootstrap";

import "./Education.css";

const test = require("../../images/logo192.png");

export class Education extends Component<{}> {
  private card(
    description: string,
    header: string,
    subHeader: string,
    dates: string,
    BGcolor: string,
    link: string,
    imgPath: string
  ) {
    return (
      <div className="Card Northwest" style={{ backgroundColor: BGcolor }}>
        <a href={link} target="_blank" style={{ textDecoration: "none" }}>
          <div className="Card-Logo">
            <img src={imgPath} />
          </div>
          <div className="Card-Header">{header}</div>
          <hr />
          <div className="Card-SubHeader">{subHeader}</div>

          <div className="Card-Dates">{dates}</div>
          <hr />
          <div className="Card-Desc">{description}</div>
        </a>
      </div>
    );
  }

  public render() {
    return (
      <div className="Education Page">
        <Row className="Cards">
          <Col>
            {this.card(
              "The program allows students to complete their BS degree by taking two additional years of credit hours beyond their associate degree. Upon completion, I will be prepared for entry-level positions in the electrical and computer engineering technology field, and will have the skills necessary to design, develop and test electronic systems, software and hardware.",
              "Bachelor's: Electrical and Computer Engineering Technology ",
              "Miami University of Ohio",
              "Aug 2023 – May 2025",
              "#c41230",
              "https://miamioh.edu/regionals/academics/departments/ent/admission/transfer-and-articulations/ecet/northwest-state-sem/index.html",
              "Miami.png"
            )}
          </Col>
          <Col>
            {this.card(
              "The Electro-Mechanical Engineering Technology program combines foundational curriculum from the Mechanical Engineering Technology and Electrical Engineering Technology programs. From this program I have gained a solid foundation in the principles of mechanics, mechanical systems, electrical concepts, and electronics through comprehensive curriculum and laboratory experiences. ",
              "Associate's: Electro-Mechanical Engineering Technology",
              "Northwest State Community College",
              "Aug 2021 – Nov 2023",
              "#008030",
              "https://northweststate.edu/wp-content/uploads/files/20.02ElectroMechancial.pdf",
              "Northwest.png"
            )}
          </Col>
          <Col>
            {this.card(
              "The Computer Science Engineering Technology program prepared me for the field of computer science with a comprehensive understanding of computer hardware and software at the machine and system level. The program combines curriculum in electronics and computer programming addressing both hardware and software aspects of computer design and applications. The design aspect places emphasis on computer structures, computer architectures, microcomputer systems, digital design, and computational applications. The applications part of the program includes a general knowledge of computer operating systems, utilization of software in engineering technologies, low and high-level programming techniques, and the use of mathematical algorithms.",
              "Associate's: Computer Science Engineering Technology",
              "Northwest State Community College",
              "Aug 2021 – May 2023",
              "#008030",
              "https://northweststate.edu/wp-content/uploads/files/20.6-Computer-Science-Eng-Tech.pdf",
              "Northwest.png"
            )}
          </Col>
        </Row>
      </div>
    );
  }
}
export default Education;
