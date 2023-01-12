import React from "react";
import { Component } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

import "./Contact.css";

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
    imgPath: string,
    header: string,
    site: string,
    url: string,
    className: string
  ) {
    return (
        <a className={"Social-Card " + className} href={url} target="blank">
          <div>
            <img className="Social-Image" src={imgPath} />
            <div className="Social-Info">
              <div className="Social-Header">{header}</div>
              <div className="Social-Site">{site}</div>
            </div>
          </div>
        </a>
    );
  }

  private sendEmail() {
    // Encode the message to make sure it can be sent in the URL
    const encodedMessage = encodeURIComponent(this.state.Message);

    // Compose the mailto link
    const mailtoLink = `mailto:garrett.sidle@gmail.com?subject=${this.state.Subject}Email&body=${encodedMessage}`;

    // Open the mailto link
    window.location.href = mailtoLink;
  }

  private printForm() {
    return (
      <div className="Contact-Form">
        <Row className="Form-Name-Email">
          <Col>
            <Form.Group className="mb-3" controlId="FormName">
              <Form.Control type="text" placeholder="Your Name" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="FormEmail">
              <Form.Control type="email" placeholder="Your Email" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Form.Group className="mb-3" controlId="FormSubject">
            <Form.Control type="text" placeholder="Your Subject" />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group className="mb-3" controlId="FormSubject">
            <Form.Control
              className="Form-Message"
              type="text"
              placeholder="Your Message"
            />
          </Form.Group>
        </Row>
        <Row>
          <Button
            onClick={() => {
              this.sendEmail();
            }}
            size="lg"
            className="Connect-Button"
          >
            Send
          </Button>
        </Row>
      </div>
    );
  }

  public render() {
    return (
      <div className="Contact Page">
        <div className="Social-Links">
          {this.printSocial(
            "github.svg",
            "LOOK AT MY",
            "GITHUB",
            "https://github.com/GarrettSidle",
            "Git-Hub"
          )}
          {this.printSocial(
            "linkedin.svg",
            "ADD ME ON",
            "LINKEDIN",
            "https://www.linkedin.com/in/garrettsidle/",
            "Linked-In"
          )}
          {this.printSocial(
            "Email.svg",
            "REACH ME AT ",
            "GARRRETT.SIDLE@GMAIL.COM",
            "mailto:garrett.sidle@gmail.com",
            "Email"
          )}
        </div>
        <div className="Contact-Sheet">
          <div className="Contact-Title">CONNECT</div>
          <hr />
          {this.printForm()}
        </div>
      </div>
    );
  }
}

export default Contact;
