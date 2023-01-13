import React from "react";
import { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { CgCPlusPlus } from "react-icons/cg";
import { AiOutlineConsoleSql } from "react-icons/ai";
import { DiReact, DiPython, DiGit, DiCss3, DiJava } from "react-icons/di";
import {
  SiLinux,
  SiVisualstudiocode,
  SiVisualstudio,
  SiPostman,
  SiHtml5,
  SiJavascript,
  SiTypescript,
  SiCsharp,
} from "react-icons/si";

import "./About.css";

const techStack = [
  { Component: SiTypescript, Tooltip: "TypeScript" },
  { Component: SiJavascript, Tooltip: "JavaScript" },
  { Component: DiReact, Tooltip: "React" },
  { Component: DiPython, Tooltip: "Python" },
  { Component: SiCsharp, Tooltip: "C#" },
  { Component: SiHtml5, Tooltip: "HTML" },
  { Component: DiCss3, Tooltip: "CSS" },
  { Component: AiOutlineConsoleSql, Tooltip: "MSSQL (Microsoft SQL)" },
  { Component: CgCPlusPlus, Tooltip: "C++" },
  { Component: DiJava, Tooltip: "Java" },
];

const toolStack = [
  { Component: DiGit, Tooltip: "Git" },
  { Component: SiVisualstudiocode, Tooltip: "Visual Studio Code" },
  { Component: SiPostman, Tooltip: "Postman" },
  { Component: SiLinux, Tooltip: "Linux" },
  { Component: SiVisualstudio, Tooltip: "Visual Studio" },
];

export class About extends Component<{}> {
  private TechStack() {
    return (
      <Row className="Tech-Stack">
        {techStack.map((Tech) => (
          <Col xs={4} md={2} className="Tech-Icons">
              <Tech.Component />
              <div className="Tech-Title">{Tech.Tooltip}</div>
          </Col>
        ))}
      </Row>
    );
  }

  private ToolStack() {
    return (
      <Row className="Tech-Stack">
        {toolStack.map((Tool) => (
          <Col xs={4} md={2} className="Tech-Icons">
            <Tool.Component />
            <div className="Tech-Title">{Tool.Tooltip}</div>
            
          </Col>
        ))}
      </Row>
    );
  }

  public render() {
    return (
      <div className="About Page">
        <Container fluid className="About-Section">
          <Container>
            <Row>
              <Col className="Email-Header">Garrett.Sidle.Rec@Gmail.com</Col>

              <Col className="Phone-Header">(419)-956-7970</Col>
            </Row>
            <hr />
            <Row className="About-Me">
              <Col md={7} className="About-Paragraph">
                <h1
                  className="Project-Heading"
                  style={{ paddingBottom: "20px" }}
                >
                  More About <strong className="Orange">Me</strong>
                </h1>
                I am Garrett Sidle, currently pursuing a bachelor's degree in
                Electrical and Computer Engineering Technology at Miami
                University of Ohio. I have already received my associate's
                degree in Computer Science, and I am also currently enrolled in
                an Electro-Mechanical Engineering program. My experience
                includes my software engineering internship at Automatic Feed
                Company, where I developed and maintained a plant analysis
                website and an internal company website. I also gained hands-on
                experience in full-stack web development, C# programming, and
                troubleshooting industrial systems. In my spare time, I like to
                stay active by going to the gym, playing sports, and I also
                spend time on my own learning new technologies and frameworks
                that interest me.
              </Col>
              <Col md={5} className="About-Image">
                <img
                  src={"/Headshot.jpg"}
                  alt="about"
                  className="About-Headshot"
                />
              </Col>
            </Row>
            <h1 className="Project-Heading">
              Professional <strong className="Orange">Skillset </strong>
            </h1>

            {this.TechStack()}

            <h1 className="Project-Heading">
              <strong className="Orange">Tools</strong> I use
            </h1>
            {this.ToolStack()}
          </Container>
        </Container>
      </div>
    );
  }
}
export default About;
