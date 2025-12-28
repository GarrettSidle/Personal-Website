import { Component } from "react";

import "../Blog.css";
import ProjectCard from "../../../components/ProjectCard/ProjectCard";

type BlogProps = {
    source: string;
    demo: string;
    tags: string[];
};

export class AssemblyCompiler extends Component<BlogProps> {

    public render() {
        return (
            <div className="Blog-Post">
                <h1>ROM <strong className="Orange">Assembly</strong> Compiler </h1>
                <div className="Project-Tags">
                    {this.props.tags.map((tag: string, index: number) => (
                        <div key={index} className="Project-Tag">{"</ " + tag + " >"}</div>
                    ))}
                </div>
                <div className="Blog-Links">{ProjectCard.getProjectLinks(this.props.source, this.props.demo)}</div>
                <div className="Image-Container">
                    <img src={'/assets/Projects/AssemblyCompiler/Overview.png'} />
                </div>
                <p>I developed a ROM assembly compiler that bridges the gap between high-level assembly programming and the custom opcode architecture of my 8-bit breadboard computer. This compiler translates my own RISC-style assembly language into machine-readable opcodes and writes the compiled data directly to an EEPROM using an Arduino Uno.</p>
                <p>The project simplifies program creation for my computer by automating opcode generation and EEPROM programming. It highlights my skills in designing program compilation, integrating hardware, and understanding low-level computing concepts.</p>
            </div>
        )

    }
}