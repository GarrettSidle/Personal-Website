import { Component } from "react";
import { CgCPlusPlus } from "react-icons/cg";
import { AiOutlineConsoleSql, AiOutlineCode } from "react-icons/ai";
import { DiReact, DiPython, DiGit, DiJava, DiPostgresql } from "react-icons/di";
import {
  SiLinux,
  SiTypescript,
  SiCsharp,
  SiTensorflow,
  SiTestcafe,
  SiFastapi,
  SiMicrosoftazure,
  SiDocker,
  SiRedis,
  SiDotnet,
  SiGradle,
  SiMicrosoftsqlserver,
  SiApachekafka,
  SiAzuredevops,
  SiKubernetes,
  SiGrafana,
  SiSpring,
} from "react-icons/si";
import { FaAws, FaNodeJs } from "react-icons/fa";
import { GrVmware } from "react-icons/gr";
import { IoLogoTableau } from "react-icons/io5";
import { MdOutlineCopyright } from "react-icons/md";

import "./About.css";

const techStack = [
  { Component: DiJava, Tooltip: "Java" },
  { Component: SiSpring, Tooltip: "Spring Boot" },
  { Component: SiCsharp, Tooltip: "C#" },
  { Component: SiDotnet, Tooltip: ".NET 6+" },
  { Component: SiMicrosoftsqlserver, Tooltip: "SQL Server" },
  { Component: DiPostgresql, Tooltip: "PostgreSQL" },
  { Component: SiApachekafka, Tooltip: "Apache Kafka" },
  { Component: AiOutlineConsoleSql, Tooltip: "SQL" },
  { Component: DiPython, Tooltip: "Python" },
  { Component: SiFastapi, Tooltip: "FastAPI" },
  { Component: FaNodeJs, Tooltip: "Node.js" },
  { Component: SiTypescript, Tooltip: "TypeScript" },
];

const toolStack = [
  { Component: SiMicrosoftazure, Tooltip: "Azure Cloud" },
  { Component: FaAws, Tooltip: "AWS" },
  { Component: SiKubernetes, Tooltip: "Kubernetes" },
  { Component: SiAzuredevops, Tooltip: "Azure DevOps CI/CD" },
  { Component: SiDocker, Tooltip: "Docker" },
  { Component: DiGit, Tooltip: "Git" },
  { Component: SiLinux, Tooltip: "Linux" },
  { Component: SiGrafana, Tooltip: "Grafana" },
  { Component: SiRedis, Tooltip: "Redis" },
  { Component: SiGradle, Tooltip: "Maven / Gradle" },
  { Component: SiMicrosoftazure, Tooltip: "Azure Service Bus" },
  { Component: GrVmware, Tooltip: "VMWare" },
];

export class About extends Component<{}> {
  private TechStack() {
    return (
      <div className="Tech-Stack">
        {techStack.map(({ Component, Tooltip }, index) => (
          <div key={index} className="Tech-Icons">
            <Component className="Tech-Img" />
            <div className="Tech-Title">{Tooltip}</div>
          </div>
        ))}
      </div>
    );
  }

  private ToolStack() {
    return (
      <div className="Tech-Stack">
        {toolStack.map(({ Component, Tooltip }, index) => (
          <div key={index} className="Tech-Icons">
            <Component className="Tech-Img" />
            <div className="Tech-Title">{Tooltip}</div>
          </div>
        ))}
      </div>
    );
  }

  public render() {
    return (
      <div className="About-Section Page" id="About">
        <div className="About-Me">
          <div className="About-Paragraph">
            <h1 className="About-Heading">
              More About <strong className="Orange">Me</strong>
            </h1>
            I'm a backend engineer with experience building enterprise-grade
            services and APIs. I work on backend systems that power critical
            business operations. My work centers around maximizing uptime for
            our services abd developing new features, ensuring they remain
            reliable and available for users. I focus on monitoring system
            health, identifying potential issues before they impact users, and
            implementing improvements that enhance stability and performance.
            I'm continuously learning and growing in my role, taking on new
            challenges. When I'm not coding, I enjoy working out to stay active,
            playing chess, exploring new technologies and side projects in my
            spare time.
          </div>
          <img
            src="/assets/Headshot.png"
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
