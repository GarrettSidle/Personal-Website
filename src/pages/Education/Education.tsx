import React from "react";
import { Component } from "react";
import { Card } from "./Card";

import "./Education.css";

const test = require("../../images/logo192.png");

export class Education extends Component<{}> {
  public render() {
    return (
      <div className="Education Page">
        <Card
          description="At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et "
          header="Bachelor's: Electrical and Computer Engineering Technology "
          subHeader="Miami University of Ohio"
          dates= "Aug. 2023 – May 2025"
          image={test}
        />
        <Card
          description="At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et "
          header="AS Electro-Mechanical Engineering Technology"
          subHeader="Northwest State Community College"
          dates= "Aug. 2021 – Nov 2023"
          image={test}
        />
        <Card
          description="At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et "
          header="Computer Science Engineering Technology"
          subHeader="Northwest State Community College"
          dates= "Aug. 2021 – May 2023"
          image={test}
        />
      </div>
    );
  }
}
export default Education;
