
import { Component } from "react";

import "../Blog.css";
import ProjectCard from "../../../components/ProjectCard/ProjectCard";
import { ProjectLink } from "../../../models/Project";

type BlogProps = {
    links: ProjectLink[];
    tags: string[];
};

export class HexChess extends Component<BlogProps> {
    public render() {
        return (
            <div className="Blog-Post">
                <h1>Hexagonal <strong className="Orange">Chess</strong> Program in C#</h1>
                <div className="Project-Tags">
                    {this.props.tags.map((tag: string, index: number) => (
                        <div key={index} className="Project-Tag">{"</ " + tag + " >"}</div>
                    ))}
                </div>
                <div className="Blog-Links">{ProjectCard.getProjectLinks(this.props.links)}</div>
                <div className="Image-Container">
                    <img src={'/assets/Projects/HexagonalChess/Played Game.png'} />
                </div>
                <h2>Project Overview</h2>
                <p>This WPF application offers a fresh take on classic chess, bringing hexagonal chess variants—such as Glinski, McCooey, and Hexofen—to a digital platform. Designed with both single and multiplayer modes, it allows users to experience the complexity and strategy of hexagonal chess in an engaging and user-friendly format.</p>
                <h2>Software Architecture</h2>
                <p>The application is built with C#, leveraging WPF for a clean and responsive interface. It features a custom <strong>Breadth-Depth Search</strong> system for move validation, dynamically calculating available moves in real-time and adapting to hexagonal board mechanics. The <strong>modular architecture</strong> facilitates easy addition of new game variants and components, while a lightweight chess evaluation system assesses board positions to guide strategic decision-making.</p>
                <h2>Variants</h2>
                <div className="Image-Container">
                    <img src={'/assets/Projects/HexagonalChess/Settings.png'} />
                </div>
                <p>Three unique hexagonal chess variants are implemented: <strong>Glinski</strong>, <strong>McCooey</strong>, and <strong>Hexofen</strong>. Each variant retains its distinct rules and board layouts. The chess engine accommodates each variant’s specific rules, seamlessly adapting move validation and board rendering to suit the selected game type.</p>
                <div className="Images-Container">
                    <div className="Images-Title">Glinski</div>
                    <div className="Images-Title">McCooey</div>
                    <div className="Images-Title">Hexofren</div>
                </div>
                <div className="Images-Container">
                    <img src={'/assets/Projects/HexagonalChess/Glinski Board.png'} />
                    <img src={'/assets/Projects/HexagonalChess/McCooey Board.png'} />
                    <img src={'/assets/Projects/HexagonalChess/Hexofren Board.png'} />
                </div>
                <h2>Online Play</h2>
                <p>The application supports <strong>peer-to-peer</strong> multiplayer, allowing users to play against others with minimal setup. Using <strong>asynchronous communication</strong>, the game ensures smooth turns and state synchronization across devices. Advanced networking features, such as automatic reconnection enhance the multiplayer experience, making it intuitive and accessible.</p>
                <h2>Other Images</h2>
                <h4>Home Screen</h4>
                <div className="Image-Container">
                    <img src={'/assets/Projects/HexagonalChess/Home.png'} />
                </div>
                <h4>Result Screen</h4>
                <div className="Image-Container">
                    <img src={'/assets/Projects/HexagonalChess/Result Screen.png'} />
                </div>




            </div>
        )
    }
}