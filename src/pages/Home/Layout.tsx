import { Component } from "react";
import Education from "../Education/Education";
import Home from "./Home";
import Projects from "../Projects/Projects";
import About from "../About/About";
import ConnectForm from "../Contact/form";



export class Layout extends Component<{}> {


  public render() {
    return (
      <div>
        <Projects/>
      </div>
    );
  }
}
export default Layout;
