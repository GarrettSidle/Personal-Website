import { Component } from "react";
import { CgCPlusPlus } from "react-icons/cg";
import { AiOutlineConsoleSql, AiOutlineCode } from "react-icons/ai";
import { DiReact, DiPython, DiGit, DiJava } from "react-icons/di";
import { SiLinux, SiTypescript, SiCsharp, SiTensorflow, SiTestcafe } from "react-icons/si";
import { FaAws, FaNodeJs } from "react-icons/fa";
import { GrVmware, GrGraphQl } from "react-icons/gr";
import { IoLogoTableau } from "react-icons/io5";
import { MdOutlineCopyright } from "react-icons/md";


import "./About.css";

const techStack = [
  { Component: SiCsharp, Tooltip: "C#" },
  { Component: SiTypescript, Tooltip: "TypeScript" },
  { Component: DiReact, Tooltip: "React" },
  { Component: DiPython, Tooltip: "Python" },
  { Component: AiOutlineConsoleSql, Tooltip: "SQL" },
  { Component: AiOutlineCode, Tooltip: "MATLAB" },
  { Component: CgCPlusPlus, Tooltip: "C++" },
  { Component: DiJava, Tooltip: "Java" },
  { Component: FaNodeJs, Tooltip: "Node.js" },
  { Component: GrGraphQl, Tooltip: "GraphQL" },
  { Component: MdOutlineCopyright, Tooltip: "C" },
  { Component: SiTensorflow, Tooltip: "Tensorflow" },
];

const toolStack = [
  { Component: DiGit, Tooltip: "Git" },
  { Component: SiLinux, Tooltip: "Linux" },
  { Component: GrVmware, Tooltip: "VMWare" },
  { Component: FaAws, Tooltip: "AWS" },
  { Component: IoLogoTableau, Tooltip: "Tableau" },
  { Component: SiTestcafe, Tooltip: "TestCafe" },

];

export class About extends Component<{}> {
  private TechStack() {
    return (
      <div className="Tech-Stack">
        {techStack.map((Tech) => (
          <div className="Tech-Icons" key={Tech.Tooltip}>
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
          <div className="Tech-Icons" key={Tool.Tooltip}>
            <Tool.Component />
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
            src="/assets/Headshot.jpg"
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
