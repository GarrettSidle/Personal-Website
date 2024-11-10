import { Component } from "react";
import { CgCPlusPlus } from "react-icons/cg";
import { AiOutlineConsoleSql } from "react-icons/ai";
import { DiReact, DiPython, DiGit, DiCss3, DiJava } from "react-icons/di";
import {
  SiLinux,
  SiVisualstudiocode,
  SiVisualstudio,
  SiPostman,
  SiHtml5,
  SiJavascript,
  SiTypescript,
  SiCsharp,
} from "react-icons/si";

import "./About.css";

const headshot = require("../../assets/headshot.jpg")

const techStack = [
  { Component: SiTypescript, Tooltip: "TypeScript" },
  { Component: SiJavascript, Tooltip: "JavaScript" },
  { Component: DiReact, Tooltip: "React" },
  { Component: DiPython, Tooltip: "Python" },
  { Component: SiCsharp, Tooltip: "C#" },
  { Component: SiHtml5, Tooltip: "HTML" },
  { Component: DiCss3, Tooltip: "CSS" },
  { Component: AiOutlineConsoleSql, Tooltip: "MSSQL (Microsoft SQL)" },
  { Component: CgCPlusPlus, Tooltip: "C++" },
  { Component: DiJava, Tooltip: "Java" },
];

const toolStack = [
  { Component: DiGit, Tooltip: "Git" },
  { Component: SiVisualstudiocode, Tooltip: "Visual Studio Code" },
  { Component: SiPostman, Tooltip: "Postman" },
  { Component: SiLinux, Tooltip: "Linux" },
  { Component: SiVisualstudio, Tooltip: "Visual Studio" },
];

export class About extends Component<{}> {
  private TechStack() {
    return (
      <div className="Tech-Stack">
        {techStack.map((Tech) => (
          <div className="Tech-Icons">
            <Tech.Component />
            <div className="Tech-Title">{Tech.Tooltip}</div>
          </div>
        ))}
      </div>
    );
  }

  private ToolStack() {
    return (
      
      <div className="Tech-Stack">
        {toolStack.map((Tool) => (
          <div className="Tech-Icons">
            <Tool.Component  />
            <div className="Tech-Title">{Tool.Tooltip}</div>
          </div>
        ))}
      </div>
    );
  }

  public render() {
    return (
        <div className="About-Section Page" id="About" >


          <div className="About-Me">
            <div className="About-Paragraph">
              <h1 className="About-Heading" >
                More About <strong className="Orange">Me</strong>
              </h1>
              I'm a dedicated software engineer with hands-on experience from internships at Automatic
              Feed Company, Leonardo DRS, and GEICO. My background is rooted in both low-level and backend
              systems, where I’ve applied skills in C#, Python, C++, and MATLAB to build efficient, scalable
              solutions. I thrive on tackling complex challenges and developing impactful applications that
              bridge technology with practical solutions. I’m always looking to expand my knowledge and contribute
              to innovative projects.
            </div>
            <img
              src={headshot}
              alt="about"
              className="About-Headshot"
            />
          </div>


          <h1 className="Stack-Heading">
            Professional <strong className="Orange">Skillset </strong>
          </h1>
          {this.TechStack()}

          <h1 className="Stack-Heading">
            <strong className="Orange">Tools</strong> I use
          </h1>
          {this.ToolStack()}

        </div>
    );
  }
}
export default About;
