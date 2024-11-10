import React from "react";
import { Component } from "react";
import { Nav, Navbar} from "react-bootstrap";

import "./Navigation.css";



export class Navigation extends Component<{}> {

  public render() {
    return (
      <div>
        <Navbar expand="lg" className="Navigation fixed-top" >
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse>
              <Navbar.Brand className="Nav-Brand" href="#Home">Garrett Sidle</Navbar.Brand>
              <Nav className="Nav-Links">
                <Nav.Item>
                  <Nav.Link className="Nav-Link" href="#Home">HOME</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="Nav-Link" href="#Education">EDUCATION</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="Nav-Link" href="#Projects">PROJECTS</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="Nav-Link" href="#About">ABOUT</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="Nav-Link" href="#Contact">CONNECT</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                  className="Nav-Link" 
                    href="https://github.com/GarrettSidle"
                    target="blank"
                  >
                    GITHUB
                  </Nav.Link>
                </Nav.Item>
              </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
export default Navigation;
