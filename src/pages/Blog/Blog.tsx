import { Component } from "react";

import "./Blog.css";
import { WordLadder } from "./ProjectBlogs/WordLadder";
import { HexChess } from "./ProjectBlogs/HexChess";
import { PersonalWebsite } from "./ProjectBlogs/PersonalWebsite";
import { RCCar } from "./ProjectBlogs/RC-Car";


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
                return ""
            case "mouseless":
                return ""
        }
    }

}
export default Blog;
