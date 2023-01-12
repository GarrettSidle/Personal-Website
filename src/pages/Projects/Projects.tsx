import React from "react";
import { Component } from "react";
import { ProjectsData } from "./ProjectsData";

import "./Projects.css";

export class Projects extends Component<{}> {
  private projectHeader() {
    return (
      <div className="Portfolio-Text">
        <h2 className="title-font pink-text h2-tag">My Portfolio</h2>
        <p className="white-text p-tag">
          I have spent a lot of time on different projects. I love doing
          everything from scratch. Here are some of my favorite ones which sum
          up my knowledge. I have done many small projects from different
          courses and challenges to learn the basics. You can check them on my{" "}
          <span>
            <a
              href="https://github.com/GarrettSidle" 
              className="Portfolio-Text-Github"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </span>
        </p>
      </div>
    );
  }

  private projects() {
    return (
      <div className="Pojects">
        {ProjectsData.map((project) => (
          <div key={project.id} className="Project">
            <img
              src="/Personal-Website.png"
              alt={project.name}
              className="Project-Image"
            ></img>
            <div className="Project-Description">
              <p className="white-text p-tag">{project.description}</p>
              <div className="Project-Meta-Stack ">
                {project.stack.map((stackName, index) => (
                  <p key={index}>{stackName}</p>
                ))}
              </div>
              <div className="Project-Links">
                <a href={project.source} target="_blank" rel="noreferrer">
                  <img src={"/project-source.png"} alt="Github icon"></img>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
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
