import { Component } from "react";

import "./Blog.css";
import { WordLadder } from "./ProjectBlogs/WordLadder";
import { HexChess } from "./ProjectBlogs/HexChess";
import { PersonalWebsite } from "./ProjectBlogs/PersonalWebsite";
import { RCCar } from "./ProjectBlogs/RC-Car";
import { EightBit } from "./ProjectBlogs/8-Bit";
import { Mouseless } from "./ProjectBlogs/Mouseless";
import { AssemblyCompiler } from "./ProjectBlogs/AssemblyCompiler";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import { Project } from "../../models/Project";
import { AutonomousKart } from "./ProjectBlogs/AutonomousKart";
import { AltManager } from "./ProjectBlogs/AltManager";
import { OWALT } from "./ProjectBlogs/OWAlt";

export class Blog extends Component<{}> {
  urlParams = new URLSearchParams(window.location.search);
  projectId: string = this.urlParams.get("id") ?? "";

  ProjectsData: Array<Project> = require("../Projects/ProjectsData.json");

  SimilarProjects: Array<Project> = [];

  projectDemos: Map<string, string> = new Map();
  projectSources: Map<string, string> = new Map();

  private findProjects(projectId: any) {
    let currentTags: Array<string> = [];

    this.ProjectsData.forEach((project) => {
      this.projectDemos.set(project.id, project.demo);

      this.projectSources.set(project.id, project.source);

      //if we are looking at the current project
      if (project.id == projectId) {
        //get the associated tags
        currentTags = project.tags;
        //remove it from the project pool
        this.ProjectsData.splice(this.ProjectsData.indexOf(project), 1);
      }
    });

    for (let i = 0; i < this.ProjectsData.length; i++) {
      let project = this.ProjectsData[i];

      for (let j = 0; j < project.tags.length; j++) {
        let tag = project.tags[j];

        //If this projects shares a tag with our current projects
        if (currentTags.includes(tag)) {
          //Add it to the ouptut
          this.SimilarProjects.push(project);

          this.ProjectsData.splice(i, 1);

          break;
        }
      }
      if (this.SimilarProjects.length == 2) {
        break;
      }
    }

    //if we dont have 2 valid returns
    let i = 0;
    while (this.SimilarProjects.length < 2) {
      //add the most recent projects
      this.SimilarProjects.push(this.ProjectsData[i]);
      i++;
    }

    return;
  }

  public render() {
    return (
      <div className="Blog Page" id="Blog">
        {this.getProject()}
        {this.getSimilarProjects()}
      </div>
    );
  }

  public getProjectLinks(source: string, demo: string) {
    return (
      <div className="Project-Links Blog-Links">
        {source !== "" ? ProjectCard.github(source) : ""}
        {demo !== "" ? ProjectCard.demo(demo) : ""}
      </div>
    );
  }

  private getProject() {
    this.findProjects(this.projectId);
    let source = String(this.projectSources.get(this.projectId));
    let demo = String(this.projectDemos.get(this.projectId));

    console.log(source, demo);

    switch (this.projectId) {
      case "word-ladder-analysis":
        return <WordLadder source={source} demo={demo} />;
      case "hexagonal-chess-app":
        return <HexChess source={source} demo={demo} />;
      case "personal-website":
        return <PersonalWebsite source={source} demo={demo} />;
      case "rc-car":
        return <RCCar source={source} demo={demo} />;
      case "8-bit-cpu-core":
        return <EightBit source={source} demo={demo} />;
      case "mouseless":
        return <Mouseless source={source} demo={demo} />;
      case "custom-assembly-compiler":
        return <AssemblyCompiler source={source} demo={demo} />;
      case "mouseless":
        return <Mouseless source={source} demo={demo} />;
      case "autonomous-kart":
        return <AutonomousKart source={source} demo={demo} />;
      case "Alt-Manager":
        return <AltManager source={source} demo={demo} />;
      case "overwatch-account-tracker":
        return <OWALT source={source} demo={demo} />;
      default:
        return <h1 className="h404">404 - Project Not Found</h1>;
    }
  }

  private getSimilarProjects() {
    return (
      <div className="similar-projects">
        {this.SimilarProjects.map((project: any) =>
          ProjectCard.projectCard(project)
        )}
      </div>
    );
  }
}
export default Blog;
