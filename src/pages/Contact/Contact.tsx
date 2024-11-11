import React from "react";
import { Component } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import ConnectForm from "./form"

import "./Contact.css";

const LinkedIn = require("../../assets/LinkedIn.png")
const GitHub = require("../../assets/GitHub.png")
const Email = require("../../assets/Email.png")

interface ContactState {
  Name: string;
  Email: string;
  Subject: string;
  Message: string;
}

export class Contact extends Component<{}, ContactState> {
  public state: Readonly<ContactState> = {
    Name: "",
    Email: "",
    Subject: "",
    Message: "", 
  };

  private printSocial(
    img : any,
    header: string,
    site: string,
    url: string,
    className: string
  ) {
    return (
        <a className={"Social-Card " + className} href={url} target="blank">
          <div>
            <img className="Social-Image" src={img} />
            <div className="Social-Info">
              <div className="Social-Header">{header}</div>
              <div className="Social-Site">{site}</div>
            </div>
          </div>
        </a>
    );
  }


  private printForm() {
    return (
      <div className="Contact-Form">
        <ConnectForm/>
      </div>
    );
  }

  public render() {
    return (
      <div className="Contact Page" id='Contact'>
        <div className="Contact-Title">CONNECT</div>
        <hr  className="Contact-HR"/>
        <div className="Social-Links">
          {this.printSocial(
            GitHub,
            "LOOK AT MY",
            "GITHUB",
            "https://github.com/GarrettSidle",
            "Git-Hub"
          )}
          {this.printSocial(
            LinkedIn,
            "ADD ME ON",
            "LINKEDIN",
            "https://www.linkedin.com/in/garrettsidle/",
            "Linked-In"
          )}
          {this.printSocial(
            Email,
            "REACH ME AT ",
            "GARRETT.SIDLE.REC@GMAIL.COM",
            "mailto:garrett.sidle.rec@gmail.com",
            "Email"
          )}
        </div>
        <div className="Contact-Sheet">
          {this.printForm()}
        </div>
      </div>
    );
  }
}

export default Contact;
