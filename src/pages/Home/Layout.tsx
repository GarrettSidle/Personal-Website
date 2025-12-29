import { Component } from "react";
import Education from "../Education/Education";
import WorkExperience from "../WorkExperience/WorkExperience";
import Home from "./Home";
import Projects from "../Projects/Projects";
import About from "../About/About";
import Contact from "../Contact/Contact";

export class Layout extends Component<{}> {
  public render() {
    return (
      <div>
        <Home />
        <Education />
        <WorkExperience />
        <Projects />
        <About />
        <Contact />
      </div>
    );
  }
}
export default Layout;
