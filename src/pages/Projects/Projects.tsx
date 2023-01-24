import React from "react";
import { Component } from "react";
import { ProjectsData } from "./ProjectsData";
import { FaGithub } from "react-icons/fa";
import { MdLiveTv } from "react-icons/md";

import "./Projects.css";
import { Col, Row } from "react-bootstrap";

export class Projects extends Component<{}> {
  private projectHeader() {
    return (
      <div className="Portfolio-Text">
        <h2>
          My <strong className="Orange">Portfolio</strong>
        </h2>
        <div className="Project-Intro">
          I have spent a lot of time on different projects. I love doing
          everything from scratch. Although I have done many small projects that
          are not included here.
        </div>
      </div>
    );
  }

  private projects() {
    return (
      <div className="Pojects">
        {ProjectsData.map((project) => (
          <div key={project.id} className="Project">
            <div className="Project-Title"> {project.name}</div>
            <div className="Project-Date"> {project.date}</div>
            {this.projectImages(project)}
            <div className="Project-Description">
              <p >{project.description}</p>
              <div className="Project-Meta-Stack ">
                {project.stack.map((stackName, index) => (
                  <p key={index}>{stackName}</p>
                ))}
              </div>
              <div>
                <div className="Project-Links">
                  {project.source !== "" ? this.github(project.source) : ""}
                  {project.demo !== "" ? this.demo(project.demo) : ""}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  private github(source: string) {
    return (
      <Col>
        <a href={source} target="_blank" rel="noreferrer">
          <Row className="Project-Link">
            <Col>
              <FaGithub className="Link-Img" color="white" />
            </Col>
            <Col>
              <div className="Link-Desc">Source</div>
            </Col>
          </Row>
        </a>
      </Col>
    );
  }

  private demo(link: string) {
    return (
      <Col>
        <a href={link} target="_blank" rel="noreferrer">
          <Row className="Project-Link">
            <Col>
              <MdLiveTv className="Link-Img" color="white" />
            </Col>
            <Col>
              <div className="Link-Desc">Demo</div>
            </Col>
          </Row>
        </a>
      </Col>
    );
  }

  private projectImages(project: any) {
    if (project.secondayImgPath === "") {
      return (
        <img
          src={project.imgPath}
          alt={project.name}
          className={"Project-Image-Single"}
        />
      );
    } else {
      return (
        <Row>
          <Col>
            <img
              src={project.imgPath}
              alt={project.name}
              className="Project-Image-Double Right"
            />
          </Col>
          <Col>
            <img
              src={project.secondayImgPath}
              alt={project.name}
              className="Project-Image-Double " 
            />
          </Col>
        </Row>
      );
    }
  }

  public render() {
    return (
      <div className="Portfolio Page">
        {this.projectHeader()}
        {this.projects()}
      </div>
    );
  }
}
export default Projects;