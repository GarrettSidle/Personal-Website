import React from "react";
import { Component } from "react";
import { ProjectsData } from "./ProjectsData";
import { FaGithub } from "react-icons/fa";
import { MdLiveTv } from "react-icons/md";

import "./Projects.css";
import { Col, Row } from "react-bootstrap";
import Header from "../../components/Header/Header";

export class Projects extends Component<{}> {


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

  private projectCard(project: any) {
    return (
      <div className="Project-Card" key={project.id}>
        <div className="Project-Title"> {project.name}</div>
        <div className="Project-Date"> {project.date}</div>
        <img
          src={project.imgPath}
          alt={project.name}
          className={"Project-Image"}
        />
        <div className="Project-Links">
          {project.source !== "" ? this.github(project.source) : ""}
          {project.demo !== "" ? this.demo(project.demo) : ""}
        </div>
      </div>
    )
  }

  public render() {
    return (

      <div className="Port-Shell Page" id='Projects'>
        <Header>Projects</Header>
        <div className="Portfolio">
          <div className="Projects">
            {ProjectsData.map((project) => (
              this.projectCard(project)
            ))
            }

          </div>
        </div>
      </div>
    );
  }
}
export default Projects;


/*

      <div className="Portfolio Page">
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
      </div>
*/