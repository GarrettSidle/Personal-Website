import { Component } from 'react';

import "./ProjectCard.css";
import { FaGithub } from 'react-icons/fa';
import { MdLiveTv } from 'react-icons/md';
import { Project } from '../../models/Project';

export class ProjectCard extends Component {
    public static projectCard(project: Project) {
        return (
            <a className="Project-Card" href={`/Blog?id=${project.id}`} key={project.id}>
                <div className="Project-Title"> {project.name}</div>
                <div className="Project-Date"> {project.date}</div>

                {project.inProgress ? this.inProgress(): ""}

                <img
                    src={(`/assets/${project.imgPath}`)}
                    alt={project.name}
                    className={"Project-Image"}
                />
                

                <div className='Project-Tags'>
                    {project.tags.map((tag: any) => (
                        <div className='Project-Tag'>{"</ " + tag + " >"}</div>
                    ))}
                </div>
                <div className="Project-Links">
                    {project.source !== "" ? this.github(project.source) : ""}
                    {project.demo !== "" ? this.demo(project.demo) : ""}
                </div>
            </a>
        )
    }


    private static inProgress(){
        return (
            <div className='In-Progress-Overlay'>
                In Progress
            </div>
        )
    }


    private static github(source: string) {
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

    private static demo(link: string) {
        return (
            <a className="Project-Link-Shell" href={link} target="blank" rel="noreferrer" >
                <div className="Project-Link">
                    <MdLiveTv className="Link-Img" color="white" />
                    <div>
                        <div className="Link-Desc">Demo</div>
                    </div>
                </div>
            </a>
        );
    }
}
export default ProjectCard;