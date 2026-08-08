import { Component } from "react";

import "../Blog.css";
import ProjectCard from "../../../components/ProjectCard/ProjectCard";
import { ProjectLink } from "../../../models/Project";

type BlogProps = {
  links: ProjectLink[];
  tags: string[];
};

export class PowerGrid extends Component<BlogProps> {
  public render() {
    return (
      <div className="Blog-Post">
        <h1>
          <strong className="Orange">Power</strong> Grid
        </h1>
        <div className="Project-Tags">
          {this.props.tags.map((tag: string, index: number) => (
            <div key={index} className="Project-Tag">
              {"</ " + tag + " >"}
            </div>
          ))}
        </div>
        <div className="Blog-Links">
          {ProjectCard.getProjectLinks(this.props.links)}
        </div>

        <div className="Image-Container">
          <img
            src={"/assets/Projects/PowerGrid/Overview.png"}
            alt="Power Grid companies overview"
          />
        </div>

        <h2>Project Overview</h2>
        <p>
          For Georgia Tech&apos;s{" "}
          <strong>CS 6310 Software Architecture and Design</strong>, my group
          built <strong>Power Grid</strong>—a full-stack system for managing a
          utility company&apos;s network from generation down to the customer.
          The domain covers companies, power plants, substations, transformers,
          customers, employees, billing, and field-issue dispatch.
        </p>

        <h2>Architecture</h2>
        <p>
          We used a layered design: a <strong>Spring Boot</strong> REST API with
          a rich domain model and JPA, a <strong>React</strong> SPA (Vite) for
          operators, and <strong>PostgreSQL</strong> for persistence. The stack
          is packaged with <strong>Docker Compose</strong> so the API, frontend,
          and database run as separate services. Auth is <strong>JWT</strong>
          -based, with sensitive fields encrypted at rest.
        </p>

        <h4>Domain Model</h4>
        <div className="Image-Container">
          <img
            src={"/assets/Projects/PowerGrid/UML.jpg"}
            alt="Power Grid UML class diagram"
          />
        </div>

        <h4>Login</h4>
        <div className="Image-Container">
          <img
            src={"/assets/Projects/PowerGrid/Login.png"}
            alt="Power Grid login screen"
          />
        </div>

        <h2>What It Does</h2>
        <p>
          Operators can model the physical grid, manage customers and staff, run
          billing cycles against rate schedules, and track / dispatch issues.
          Supporting pieces include energy-source profiles, networked power
          monitors, and simulation hooks for generation and consumption data.
        </p>

        <h4>Power Plants</h4>
        <div className="Image-Container">
          <img
            src={"/assets/Projects/PowerGrid/PowerPlants.png"}
            alt="Power plants management page"
          />
        </div>

        <h4>Billing</h4>
        <div className="Image-Container">
          <img
            src={"/assets/Projects/PowerGrid/Billing.png"}
            alt="Billing cycles and rate schedules"
          />
        </div>

        <h4>Billing Cycle</h4>
        <div className="Image-Container">
          <img
            src={"/assets/Projects/PowerGrid/Sequence.png"}
            alt="Billing cycle sequence diagram"
          />
        </div>

        <p>
          Working through the course forced clear boundaries between domain,
          API, and UI—and a deployment story that matches how real services are
          shipped.
        </p>
      </div>
    );
  }
}
