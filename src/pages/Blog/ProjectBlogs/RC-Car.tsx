import { Component } from "react";

import "../Blog.css";
import ProjectCard from "../../../components/ProjectCard/ProjectCard";


type BlogProps = {
    source : string;
    demo   : string;
    tags   : string[];
  };

export class RCCar extends Component<BlogProps> {
    public render() {
        return (
            <div className="Blog-Post">
                    <h1><strong>C++</strong> Remote Control Car</h1>
                <div className="Project-Tags">
                    {this.props.tags.map((tag: string, index: number) => (
                        <div key={index} className="Project-Tag">{"</ " + tag + " >"}</div>
                    ))}
                </div>
                <div className="Blog-Links">{ProjectCard.getProjectLinks(this.props.source, this.props.demo)}</div>
                <div className="Image-Container">
                    <img src={'/assets/Projects/RC-Car/Car.png'} />
                </div>
                <h2>Project Overview</h2>
                <p>This project involves the construction of a remote-controlled car using an <strong>Arduino microcontroller</strong> and DC motors. The car is controlled via a wireless communication module, allowing for remote operation. C++ programming language is used to write the code for the Arduino, which is responsible for controlling the motors and receiving commands from the remote controller. The car's speed and direction can be adjusted using the remote, and it also includes features such as <strong>obstacle detection</strong> and <strong>automatic braking</strong>. The project demonstrates the integration of hardware and software to create a functional and user-friendly device.</p>
                <h2>Electrical Overview</h2>
                <div className="Image-Container">
                    <img src={'/assets/Projects/RC-Car/Electrical.png'} />
                </div>
            </div>
        )

    }
}