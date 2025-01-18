import { Component } from "react";

import "./Projects.css";
import Header from "../../components/Header/Header";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import { Project } from "../../models/Project";

const ProjectsData: Project[] = require('./ProjectsData.json');

//get every unique tag
const ProjectTags = new Set<string>();
ProjectTags.add("Newest")
ProjectTags.add("Oldest")
ProjectsData.forEach(project => {

  project.tags.forEach(tag => {
    ProjectTags.add(tag)
  })

});



export class Projects extends Component<{}, { selectedFilter: string }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      selectedFilter: "Newest",
    };
  }

  private changeFilter(newFilter: string) {
    this.setState(() => ({
      selectedFilter: newFilter,
    }));
  }

  public render() {
    return (
      <div className="Port-Shell Page" id='Projects'>
        <Header>Projects</Header>
        <div className="Portfolio">
          <div className="Project-Sorting">
            {
              Array.from(ProjectTags).map((tag: any) => (
                <button
                  className={this.state.selectedFilter === tag ? " Selected-Button" : "Sorting-Button"}
                  key={tag}
                  onClick={() => { this.changeFilter(tag) }}>
                  {tag}
                </button>
              ))
            }
          </div>

          <div className="Projects">
            {this.getCards()}

          </div>
        </div>
      </div>
    );
  }

  private getCards() {
    let filter = this.state.selectedFilter

    let projects = ProjectsData
    if (filter === "Oldest") {
      projects.reverse()
    }
    

    return projects.map((project: Project) => (
      (project.tags.includes(filter) || filter === "Newest" || filter === "Oldest") ?
      ProjectCard.projectCard(project):""
    ))
  }

}
export default Projects;

