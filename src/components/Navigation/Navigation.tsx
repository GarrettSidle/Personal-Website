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


private downloadResume(){
  {
    //get PDF file
    fetch('Garrett_Sidle_Resume.pdf').then(response => {
        response.blob().then(blob => {
            // Creating new object of PDF file
            const fileURL = window.URL.createObjectURL(blob);
            // Setting various property values
            let alink = document.createElement('a');
            alink.href = fileURL;
            alink.download = 'Garrett_Sidle_Resume.pdf';
            alink.click();
        })
    })
}
}
  
  public render() {
    return (
      <div>
        <Navbar expand="lg" className="Navigation" color="#f05c0c">
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse>
            <Container fluid>
              <Navbar.Brand className="Nav-Brand">Garrett Sidle</Navbar.Brand>
            </Container>
            <Container>
              <Nav activeKey={this.state.SelectedNav} className="Nav-Links">
                <Nav.Item>
                  <Nav.Link href="/Home">HOME</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/Education">EDUCATION</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/Projects">PROJECTS</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/About">ABOUT</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/Contact">CONNECT</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    onClick={() => {
                      this.downloadResume()
                    }}
                  >
                    RESUME
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
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
