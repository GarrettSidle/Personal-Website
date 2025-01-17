import { Component } from "react";

import "../Blog.css";


export class AssemblyCompiler extends Component<{}> {
    public render() {
        return (
            <div className="Blog-Post">
                <a href="https://github.com/GarrettSidle/8-Bit-Assembly-Compiler" target="blank">
                    <h1>ROM <strong className="Orange">Assembly</strong> Compiler </h1>
                </a>
                <div className="Image-Container">
                    <img src={'/assets/Projects/AssemblyCompiler/Overview.png'} />
                </div>
                <p>I developed a ROM assembly compiler that bridges the gap between high-level assembly programming and the custom opcode architecture of my 8-bit breadboard computer. This compiler translates my own RISC-style assembly language into machine-readable opcodes and writes the compiled data directly to an EEPROM using an Arduino Uno.</p>
                <p>The project simplifies program creation for my computer by automating opcode generation and EEPROM programming. It highlights my skills in designing program compilation, integrating hardware, and understanding low-level computing concepts.</p>
            </div>
        )

    }
}