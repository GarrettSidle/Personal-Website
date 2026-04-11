import { Component } from "react";

import "../Blog.css";
import ProjectCard from "../../../components/ProjectCard/ProjectCard";
import { ProjectLink } from "../../../models/Project";

type BlogProps = {
  links: ProjectLink[];
  tags: string[];
};

export class RCCar extends Component<BlogProps> {
  public render() {
    return (
      <div className="Blog-Post">
        <h1>
          <strong>C++</strong> Remote Control Car
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
          <img src={"/assets/Projects/RC-Car/Car.png"} alt="RC car build" />
        </div>
        <h2>Project Overview</h2>
        <p>
          This project involves the construction of a remote-controlled car
          using an <strong>Arduino microcontroller</strong> and DC motors. The
          car is controlled via a wireless communication module, allowing for
          remote operation. C++ programming language is used to write the code
          for the Arduino, which is responsible for controlling the motors and
          receiving commands from the remote controller. The car&apos;s speed
          and direction can be adjusted using the remote, and it also includes
          features such as <strong>obstacle detection</strong> and{" "}
          <strong>automatic braking</strong>. The project demonstrates the
          integration of hardware and software to create a functional and
          user-friendly device.
        </p>
        <h2>Electrical Overview</h2>
        <div className="Image-Container">
          <img
            src={"/assets/Projects/RC-Car/Electrical.png"}
            alt="RC car wiring and electronics"
          />
        </div>
        <h2>On the bench and in testing</h2>
        <p>
          Most of the bring-up happened on the bench: verifying motor drivers,
          sensor inputs, and the radio link before mounting everything in the
          chassis. The photos above show the finished mechanical layout and the
          electrical stack; tuning throttle curves and braking thresholds was
          iterative, but having a clear wiring diagram made debugging much
          faster once things were moving.
        </p>
        <figure className="Blog-Figure">
          <img
            src={"/assets/Projects/RC-Car/Car.png"}
            alt="RC car assembled for testing"
          />
          <figcaption>
            Final assembly used for range and steering checks after software
            bring-up.
          </figcaption>
        </figure>
      </div>
    );
  }
}
