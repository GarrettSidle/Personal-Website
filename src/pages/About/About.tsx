import React from "react";
import { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { CgCPlusPlus } from "react-icons/cg";
import { AiOutlineConsoleSql } from "react-icons/ai";
import {
  DiReact,
  DiPython,
  DiGit,
  DiCss3,
  DiJava,
} from "react-icons/di";
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
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import "./About.css";

const techStack = [
  { Component: SiTypescript, Tooltip: "TypeScript" },
  { Component: SiJavascript, Tooltip: "JavaScript" },
  { Component: DiReact, Tooltip: "React" },
  { Component: DiPython, Tooltip: "Python" },
  { Component: SiCsharp, Tooltip: "C#" },
  { Component: SiHtml5, Tooltip: "HTML" },
  { Component: DiCss3, Tooltip: "CSS" },
  { Component: AiOutlineConsoleSql, Tooltip: "MSSQL (Micosoft SQL)" },
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
      <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
        {techStack.map((tech) => (
          <Col xs={4} md={2} className="Tech-Icons">
            <tech.Component />
          </Col>
        ))}
      </Row>
    );
  }



  private ToolStack() {
    
    const renderTooltip = () => (
      <Tooltip id="button-tooltip">
        Simple tooltip
      </Tooltip>
    );

    return (
      <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
        {toolStack.map((tool) => (
          <Col xs={4} md={2} className="Tech-Icons">
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
            >
              <tool.Component />
            </OverlayTrigger>
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
            <Row style={{ justifyContent: "center", padding: "10px" }}>
              <Col
                md={7}
                style={{
                  justifyContent: "center",
                  paddingTop: "30px",
                  paddingBottom: "50px",
                }}
              >
                <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
                  More About <strong className="Orange">Me</strong>
                </h1>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate
                non provident, similique sunt in culpa qui officia deserunt
                mollitia animi, id est laborum et dolorum fuga. Et harum quidem
                rerum facilis est et expedita distinctio. Nam libero tempore,
                cum soluta nobis est eligendi optio cumque nihil impedit quo
                minus id quod maxime placeat facere possimus, omnis voluptas
                assumenda est, omnis dolor repellendus. Temporibus autem
                quibusdam et aut officiis debitis aut rerum necessitatibus saepe
                eveniet ut et voluptates repudiandae sint et molestiae non
                recusandae. Itaque earum rerum hic tenetur a sapiente delectus,
                ut aut reiciendis voluptatibus maiores alias consequatur aut
                perferendis doloribus asperiores repellat
              </Col>
              <Col
                md={5}
                style={{ paddingTop: "120px", paddingBottom: "50px" }}
                className="about-img"
              >
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
