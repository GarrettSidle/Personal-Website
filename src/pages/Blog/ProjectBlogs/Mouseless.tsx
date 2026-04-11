import { Component } from "react";

import "../Blog.css";
import ProjectCard from "../../../components/ProjectCard/ProjectCard";
import { ProjectLink } from "../../../models/Project";

type BlogProps = {
  links: ProjectLink[];
  tags: string[];
};

export class Mouseless extends Component<BlogProps> {
  public render() {
    return (
      <div className="Blog-Post">
        <h1>Mouseless</h1>
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
            src={"/assets/Projects/Mouseless/Overview.png"}
            alt="Mouseless product overview"
          />
        </div>

        <p>
          As a developer, speed and efficiency are critical when working with
          code. Traditional typing practice tools focus on raw words-per-minute,
          but coding requires a different approach—one that emphasizes
          keybindings, syntax manipulation, and precision. That&apos;s where{" "}
          <strong>Mouseless</strong> comes in.
        </p>

        <h2>What is Mouseless?</h2>

        <p>
          Mouseless is a web-based typing practice platform designed
          specifically for developers. Unlike standard typing tests, it presents
          users with
          <strong> real code snippets</strong> and requires them to modify the
          code to match a given output. This approach helps reinforce essential
          developer skills, including:
        </p>

        <ul>
          <li>
            <strong>Mastering keybindings</strong> for rapid navigation and
            editing
          </li>
          <li>
            <strong>Efficiently manipulating code</strong> without relying on a
            mouse
          </li>
          <li>
            <strong>Improving speed and accuracy</strong> in a real-world coding
            environment
          </li>
        </ul>

        <h2>Key Features</h2>

        <p className="Blog-Lead-In">
          Selected screenshots from the live product—each panel matches a real
          screen in the app.
        </p>

        <h3>Homepage</h3>
        <figure className="Blog-Figure">
          <img
            src={"/assets/Projects/Mouseless/Home.png"}
            alt="Mouseless marketing homepage"
          />
          <figcaption>
            Landing view introduces the product and routes newcomers into
            practice or account flows.
          </figcaption>
        </figure>
        <p>
          The homepage serves as the entry point to Mouseless, clearly
          explaining what the platform is and what it does. It provides users
          with an overview of the site&apos;s purpose and guides them through
          the key features and benefits of practicing code editing skills.
        </p>

        <h3>Editor</h3>
        <figure className="Blog-Figure">
          <img
            src={"/assets/Projects/Mouseless/Stats.png"}
            alt="In-session stats during a practice problem"
          />
          <figcaption>
            During a run, the UI surfaces timing, CCPM, completion, and
            keystrokes so feedback stays immediate.
          </figcaption>
        </figure>
        <p>
          The core of Mouseless is the interactive editor where users actually
          work on coding problems. The editor presents real code snippets that
          users must modify to match a given output, providing hands-on practice
          with actual development scenarios. Users can see their performance
          metrics in real-time, including time, speed (CCPM), completion
          percentage, and keystrokes as they work through each problem.
        </p>

        <h3>Shortcuts &amp; reference</h3>
        <figure className="Blog-Figure">
          <img
            src={"/assets/Projects/Mouseless/Overview.png"}
            alt="High-level view of Mouseless navigation and flows"
          />
          <figcaption>
            The same information architecture that powers shortcut drills shows
            up across navigation—everything routes back to deliberate practice.
          </figcaption>
        </figure>
        <p>
          Shortcut mastery is woven into the product rather than isolated on a
          single page: hints, drills, and navigation reinforce the same
          bindings users rely on in the editor, so muscle memory stays
          consistent end to end.
        </p>

        <h3>Stats and Leaderboards</h3>
        <div className="Image-Container">
          <img
            src={"/assets/Projects/Mouseless/Stats.png"}
            alt="Mouseless stats and comparisons"
          />
        </div>
        <p>
          The stats page provides comprehensive performance analytics for each
          problem. Users can see detailed statistics including:
        </p>

        <ul>
          <li>
            <strong>Time:</strong> How long it took to complete the problem
          </li>
          <li>
            <strong>CCPM (Characters Changed Per Minute):</strong> A measure of
            editing efficiency
          </li>
          <li>
            <strong>Keystrokes:</strong> Total number of keystrokes used
          </li>
          <li>
            <strong>User Comparisons:</strong> See how your performance stacks
            up against all other users on each problem
          </li>
        </ul>

        <p>
          This allows users to track their progress, identify areas for
          improvement, and compete with the community to achieve better
          scores.
        </p>

        <h2>Technology Stack</h2>

        <p>
          Mouseless is built with scalability and performance in mind,
          leveraging a modern, efficient stack:
        </p>

        <ul>
          <li>
            <strong>Frontend:</strong> A <strong>React</strong> application
            providing a dynamic, responsive interface
          </li>
          <li>
            <strong>Backend:</strong> A <strong>FastAPI</strong> Python backend
            with a RESTful architecture
          </li>
          <li>
            <strong>Database:</strong> <strong>PostgreSQL</strong> for robust
            data storage and retrieval
          </li>
        </ul>

        <p>
          The RESTful API architecture ensures clean separation of concerns,
          making the backend maintainable and scalable while providing efficient
          communication between the frontend and database.
        </p>

        <h2>Authentication System</h2>

        <div className="Image-Container">
          <img
            src={"/assets/Projects/Mouseless/Login.png"}
            alt="Mouseless sign-in"
          />
        </div>

        <p>
          Mouseless implements a custom authentication system using{" "}
          <strong>session-based authentication</strong> with session IDs. All
          passwords are <strong>hashed and salted</strong> for security,
          ensuring that user credentials are never stored in plain text. This
          approach provides secure authentication while maintaining a seamless
          user experience.
        </p>

        <h2>API Architecture</h2>

        <div className="Image-Container">
          <img src={"/assets/Projects/Mouseless/API.png"} alt="Mouseless API" />
        </div>

        <p>
          The backend is built using <strong>FastAPI</strong>, providing a
          high-performance, modern Python web framework. The RESTful
          architecture ensures that all endpoints follow consistent patterns,
          making the API intuitive to use and maintain. FastAPI&apos;s automatic
          API documentation and type validation help ensure reliability and make
          development more efficient.
        </p>
      </div>
    );
  }
}
