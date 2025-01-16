import { Component } from "react";

import "./Blog.css";
import { WordLadder } from "./ProjectBlogs/WordLadder";
import { HexChess } from "./ProjectBlogs/HexChess";
import { PersonalWebsite } from "./ProjectBlogs/PersonalWebsite";
import { RCCar } from "./ProjectBlogs/RC-Car";
import { EightBit } from "./ProjectBlogs/8-Bit";
import { Mouseless } from "./ProjectBlogs/Mouseless";


const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get('id');


export class Blog extends Component<{}> {
    public render() {
        return (
            <div className="Blog Page" id='Blog'>
                {this.getProject()}
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
                return <EightBit/>
            case "mouseless":
                return <Mouseless/>
            default:
                return <h1>404 - Project Not Found</h1>;
        }
    }

}
export default Blog;
