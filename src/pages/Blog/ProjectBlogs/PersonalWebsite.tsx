import { Component } from "react";

import "../Blog.css";


export class PersonalWebsite extends Component<{}> {
    public render() {
        return (
            <div className="Blog-Post">
                <a href="https://github.com/GarrettSidle/Personal-Website" target="blank">
                    <h1><strong className="Orange">Personal</strong> Website</h1>
                </a>
                <div className="Image-Container">
                    <img src={'/assets/Projects/PersonalWebsite/Personal-Website.png'} />
                </div>
                <h2>Project Overview</h2>

                <p>This is my personal website, which you're currently viewing. It was built using <strong>React</strong> to create a smooth, dynamic, and <strong>mobile-responsive</strong> user interface. With an emphasis on performance, I kept external dependencies to a minimum, ensuring a fast and efficient browsing experience. The website showcases a clean, modern design, offering an intuitive navigation system and dynamic content rendering. Hosted on <strong>AWS</strong>, the site is designed for scalability and high availability, providing a reliable user experience. It serves as both a portfolio and a space for showcasing various projects, reflecting my skills in web development and software engineering.</p>
                <h2>Other Images</h2>
                <h4>Blog Page</h4>
                <div className="Image-Container">
                    <img src={'/assets/Projects/PersonalWebsite/Blog.png'} />
                </div>

            </div>
        )
    }

}
