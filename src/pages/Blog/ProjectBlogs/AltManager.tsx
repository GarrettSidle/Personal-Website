import { Component } from "react";

import "../Blog.css";
import ProjectCard from "../../../components/ProjectCard/ProjectCard";

type BlogProps = {
    source: string;
    demo: string;
};

export class AltManager extends Component<BlogProps> {

    public render() {
        return (
            <div className="Blog-Post">
                <div>
                    <h1><strong className="Orange">Alternative</strong> Account Manager </h1>

                    <div className="Blog-Links">{ProjectCard.getProjectLinks(this.props.source, this.props.demo)}</div>
                    <div className="Image-Container">
                        <img src={'/assets/Projects/Alt-Manager/Overview.png'} />
                    </div>
                    <p>
                        The <strong>Overwatch Alt Account Manager</strong> is a desktop automation tool I built to simplify the process of switching between multiple game accounts. Originally developed for personal use, the project has grown to support around <strong>100 confirmed users</strong> and continues to be a lightweight, effective solution for seamless multi-account management.
                    </p>
                </div>



                <div>
                    <h2>What I Built</h2>
                    <p>
                        This application was developed in <strong>Python</strong>, the UI was built using the <strong>Tkinter</strong> library, and packaged into a standalone executable using <strong>PyInstaller</strong>. The goal was to create a clean and intuitive interface backed by reliable backend automation. It integrates smoothly with Battle.net to handle login workflows without requiring manual input.
                    </p>
                    <h3>Key Technical Features:</h3>
                    <ul>
                        <li><strong>Automation scripting</strong> to handle logout/login and launch the game automatically.</li>
                        <li><strong>Local JSON configuration</strong> to securely store account information with no network dependency.</li>
                        <li><strong>Responsive UI</strong> that lists accounts with visual rank indicators and queue compatibility.</li>
                        <li><strong>Executable packaging</strong> for easy distribution with no installation required.</li>
                    </ul>
                </div>

                <div>
                    <h2>Real-World Adoption</h2>
                    <p>
                        After sharing the project online, it quickly gained attention from players looking for similar solutions. Today, the tool has around <strong>100 confirmed users</strong> and has demonstrated strong reliability in real-world use, with no reported bugs or installation issues.
                    </p>
                </div>

                <div>
                    <h2>Takeaways</h2>
                    <p>
                        This project pushed me to think critically about both system design and user experience. From developing the automation logic to ensuring a polished interface, I had full ownership of the product lifecycle. Building a <strong>fully self-contained desktop app</strong> that others now rely on has been a major highlight in my journey as a developer.
                    </p>
                </div>

            </div>
        )

    }
}