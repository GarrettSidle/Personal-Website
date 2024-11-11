import React from "react";
import { Component } from "react";
import { FaGithub } from "react-icons/fa";
import { MdLiveTv } from "react-icons/md";

import "./Projects.css";
import Header from "../../components/Header/Header";

const ProjectsData = require('./ProjectsData.json');


export class Projects extends Component<{}> {
  private github(source: string) {
    return (
        <a href={source} target="blank" rel="noreferrer">
          <div className="Project-Link">
            <div>
              <FaGithub className="Link-Img" color="white" />
            </div>
            <div>
              <div className="Link-Desc">Source</div>
            </div>
          </div>
        </a>
    );
  }

  private demo(link: string) {
    return (
        <a className="Project-Link-Shell" href={link} target="blank" rel="noreferrer">
          <div className="Project-Link">
              <MdLiveTv className="Link-Img" color="white" />
            <div>
              <div className="Link-Desc">Demo</div>
            </div>
          </div>
        </a>
    );
  }

  private projectCard(project: any) {
    return (
      <a className="Project-Card" href={`/Blog?id=${project.id}`} key={project.id}>
        <div className="Project-Title"> {project.name}</div>
        <div className="Project-Date"> {project.date}</div>
        <img
          src={require(`../../assets/${project.imgPath}`)}
          alt={project.name}
          className={"Project-Image"}
        />
        <div className="Project-Links">
          {project.source !== "" ? this.github(project.source) : ""}
          {project.demo !== "" ? this.demo(project.demo) : ""}
        </div>
      </a>
    )
  }

  public render() {
    return (

      <div className="Port-Shell Page" id='Projects'>
        <Header>Projects</Header>
        <div className="Portfolio">
          <div className="Projects">
            {ProjectsData.map((project: any) => (
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

