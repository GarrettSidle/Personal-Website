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
        <Navbar expand="lg" className="Navigation fixed-top" >
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse>
            <Container fluid>
              <Navbar.Brand className="Nav-Brand">Garrett Sidle</Navbar.Brand>
            </Container>
            <Container>
              <Nav activeKey={this.state.SelectedNav} className="Nav-Links">
                <Nav.Item>
                  <Nav.Link className="Nav-Links" href="#Home">HOME</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="Nav-Links" href="#Education">EDUCATION</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="Nav-Links" href="#Projects">PROJECTS</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="Nav-Links" href="#About">ABOUT</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="Nav-Links" href="#Contact">CONNECT</Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link
                  className="Nav-Links" 
                    href="https://github.com/GarrettSidle"
                    target="blank"
                  >
                    GITHUB
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Container>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
export default Navigation;
