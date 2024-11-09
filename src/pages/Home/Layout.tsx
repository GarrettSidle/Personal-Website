import { Component } from "react";
import Education from "../Education/Education";
import Home from "./Home";
import Projects from "../Projects/Projects";
import About from "../About/About";
import ConnectForm from "../Contact/form";
import Contact from "../Contact/Contact";



export class Layout extends Component<{}> {


  public render() {
    return (
      <div>
        <Home/>
        <Education/>
        <Projects/>

        <Contact/>
      </div>
    );
  }
}
export default Layout;
