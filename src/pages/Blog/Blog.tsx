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





const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get('id');

const ProjectsData: Array<Project> = require('../Projects/ProjectsData.json');


let SimilarProjects: Array<Project> = []


findProjects()

console.log(SimilarProjects)


function findProjects() {

    let currentTags: Array<string> = []

    ProjectsData.forEach(project => {

        //if we are looking at the current project
        if (project.id == projectId) {
            //get the associated tags
            currentTags = project.tags
            //remove it from the project pool
            ProjectsData.splice(ProjectsData.indexOf(project), 1)
            
        }
    });


    for (let i = 0; i < ProjectsData.length; i++) {
        let project = ProjectsData[i];

        for (let j = 0; j < project.tags.length; j++) {
            let tag = project.tags[j];

            //If this projects shares a tag with our current projects
            if (currentTags.includes(tag)) {
                //Add it to the ouptut
                SimilarProjects.push(project)

                ProjectsData.splice(i, 1)

                break

            }
        }

    };

    //if we dont have 2 valid returns
    let i = 0
    while (SimilarProjects.length < 2) {
        //add the most recent projects
        SimilarProjects.push(ProjectsData[i])
        i++
    }

    return
}



export class Blog extends Component<{}> {
    public render() {
        return (
            <div className="Blog Page" id='Blog'>
                {this.getProject()}
                {this.getSimilarProjects()}
            </div>
        );
    }


    private getProject() {
        switch (projectId) {
            case "word-ladder-analysis":
                return <WordLadder />;
            case "hexagonal-chess-app":
                return <HexChess />;
            case "personal-website":
                return <PersonalWebsite />;
            case "rc-car":
                return <RCCar />;
            case "8-bit-cpu-core":
                return <EightBit />
            case "mouseless":
                return <Mouseless />
            case "custom-assembly-compiler":
                return <AssemblyCompiler />
            default:
                return <h1 className="h404">404 - Project Not Found</h1>;
        }
    }

    private getSimilarProjects() {

        return (
            <div className="similar-projects">
                {SimilarProjects.map((project: any) => (
                    ProjectCard.projectCard(project)
                ))}

            </div>
        )
    }



}
export default Blog;
