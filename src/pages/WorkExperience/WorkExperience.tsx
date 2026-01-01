import { Component } from "react";

import "./WorkExperience.css";
import Header from "../../components/Header/Header";

interface Job {
  title: string;
  dates: string;
}

interface CompanyCard {
  companyName: string;
  stack: string;
  link: string;
  img: string;
  className: string;
  jobs: Job[];
  description: string;
}

export class WorkExperience extends Component<{}> {
  private card(companyCard: CompanyCard) {
    return (
      <div className={`Card ${companyCard.className}`}>
        <a
          href={companyCard.link}
          target="_blank"
          style={{ textDecoration: "none" }}
        >
          <div className="Card-Content">
            <div>
              <img className="Card-Logo" src={companyCard.img} />
            </div>
            {companyCard.jobs.map((job, index) => (
              <div key={index}>
                <div className="Card-Header">{job.title}</div>
                <div className="Card-Dates">{job.dates}</div>
                {index < companyCard.jobs.length - 1 && (
                  <hr className="Card-HR" />
                )}
              </div>
            ))}
            <hr className="Card-HR" />
            <div className="Card-SubHeader">{companyCard.companyName}</div>
            <div className="Card-Underheader">{companyCard.stack}</div>
          </div>
          <div className="Card-Overlay">
            <div className="Card-Description">{companyCard.description}</div>
          </div>
        </a>
      </div>
    );
  }

  public render() {
    const companies: CompanyCard[] = [
      {
        companyName: "GEICO",
        stack: "Java, Spring Boot | Remote",
        link: "https://www.geico.com/tech/",
        img: "/assets/Geico.png",
        className: "GEICO",
        jobs: [
          {
            title: "Backend Software Engineer",
            dates: "May 2025 – Present",
          },
          {
            title: "Software Engineering Intern",
            dates: "May 2024 – Aug 2024",
          },
        ],
        description:
          "Design, develop, and maintain high-volume microservices architecture handling thousands of requests daily using Java and Spring Boot. Architect scalable system designs for new services, ensuring fault tolerance and optimal performance. Build comprehensive monitoring dashboards and implement real-time alerting systems to maintain 99.9%+ uptime. Collaborate on architectural decisions, conduct performance analysis, and implement message queue patterns for asynchronous processing.",
      },
      {
        companyName: "Automatic Feed Company",
        stack: "C#, SQL | Napoleon, OH",
        link: "https://www.automaticfeed.com/",
        img: "/assets/AFCO.png",
        className: "AFCO",
        jobs: [
          {
            title: "Software Engineering Intern",
            dates: "Dec 2021 – Aug 2023",
          },
        ],
        description:
          "Developed and maintained internal software applications using C# and SQL Server. Created database schemas, wrote stored procedures, and built user interfaces for Human Machine Interfaces (HMI) for manufacturing environments.",
      },
      {
        companyName: "Leonardo DRS Airborne",
        stack: "C#, C++, MATLAB | Beavercreek, OH",
        link: "https://www.leonardodrs.com/",
        img: "/assets/DRS.png",
        className: "DRS",
        jobs: [
          {
            title: "Systems Engineering Intern",
            dates: "Dec 2023 – May 2024",
          },
        ],
        description:
          "Developing software tools in C# for system analysis and testing. Used MATLAB for signal processing and data analysis. Contributed to documentation, testing procedures, and system integration activities for airborne defense systems.",
      },
    ];

    return (
      <div className="WorkExperience-Shell Page" id="WorkExperience">
        <Header>Work Experience</Header>
        <div className="WorkExperience">
          {this.card(companies[0])}
          <div className="Cards">
            <div className="col">{this.card(companies[1])}</div>
            <div className="col">{this.card(companies[2])}</div>
          </div>
        </div>
      </div>
    );
  }
}
export default WorkExperience;
