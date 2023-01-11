import React from "react";
import { Component } from "react";
import { Nav, Navbar, Container, Collapse } from "react-bootstrap";

import "./Navigation.css";

interface NavigationState {
  SelectedNav: string;
}

export class Navigation extends Component<{}, NavigationState> {
  public state: Readonly<NavigationState> = {
    //Get just the postfix of the URL
    SelectedNav: document.URL.split("/").reverse()[0],
  };

  public render() {
    return (
      <div>
        <Navbar expand="sm" className="Navigation">
          <Container fluid>
            <Navbar.Brand className="Nav-Brand">Garrett Sidle</Navbar.Brand>
          </Container>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav

              activeKey={this.state.SelectedNav}
              className="Nav-Links"
            >
              <Nav.Item>
                <Nav.Link href="Home">HOME</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="Education">EDUCATION</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="Experience">EXPERIENCE</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="Projects">PROJECTS</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="About">ABOUT</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="Contact">CONNECT</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="Garrett_Sidle_Resume.pdf">RESUME</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="https://github.com/GarrettSidle">
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
