import { Component } from "react";

import "./Education.css";
import Header from "../../components/Header/Header";

export class Education extends Component<{}> {
  private card(
    header: string,
    underHeader: String,
    subHeader: string,
    dates: string,
    link: string,
    img: any,
    className: string
  ) {
    return (
      <div className={`Card ${className}`}>
        <a href={link} target="_blank" style={{ textDecoration: "none" }}>
          <div >
            <img className="Card-Logo" src={img} />
          </div>
          <div className="Card-Header">{header}</div>
          <div className="Card-Underheader">{underHeader}</div>
          <hr className="Edu-HR" />
          <div className="Card-SubHeader">{subHeader}</div>

          <div className="Card-Dates">{dates}</div>
        </a>
      </div>
    );
  }

  public render() {
    return (
      <div className="Edu-Shell Page" id='Education'>
        <Header>My Education</Header>
        <div className="Education">
          {this.card(
            "Masters's: Computer Science",
            "Specialization: Computing Systems",
            "Georgia Institute of Technology",
            "Aug 2025 - Nov 2027",
            "https://omscs.gatech.edu/specialization-computing-systems",
            "/assets/GATech.png",
            "GATech"
          )}
          {this.card(
            "Bachelor's: Electrical and Computer Engineering",
            "",
            "Miami University of Ohio",
            "Aug 2023 – May 2025",
            "https://programs.miamioh.edu/programs/electrical-computer-engineering-technology-bs/",
            "/assets/Miami.png",
            "Miami"
          )}
          <div className="Cards">
            <div className="col">
              {this.card(
                "Associate's: Electro-Mechanical Engineering",
                "",
                "Northwest State Community College",
                "Aug 2021 – Nov 2023",
                "https://northweststate.edu/electro-mechanical-engineering-technology",
                "/assets/Northwest.png",
                "Northwest"
              )}
            </div>
            <div className="col">
              {this.card(
                "Associate's: Computer Science Engineering",
                "",
                "Northwest State Community College",
                "Aug 2021 – May 2023",
                "https://northweststate.edu/computer-science-engineering-technology",
                "/assets/Northwest.png",
                "Northwest"
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Education;
