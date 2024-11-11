import { Component } from "react";

import "./Navigation.css";


export class Navigation extends Component<{},{ navUnfolded: boolean }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      navUnfolded: false, 
    };
  }

  toggleNav = () => {
    this.setState((prevState) => ({
      navUnfolded: !prevState.navUnfolded, 
    }));
  };


  public render() {
    return (
      <div className={this.state.navUnfolded?"Enabled":""}>
        <nav className={`Navigation fixed-top`}>
          <div className="Nav-Objects">
            <a href="/#Home" className="Nav-Brand">Garrett Sidle</a>
            <button className="Hamburger" onClick={()=>{this.toggleNav()}}>☰</button>
            <div className="Nav-Links">
              <a className="Nav-Link" href="/#Home">HOME</a>
              <a className="Nav-Link" href="/#Education">EDUCATION</a>
              <a className="Nav-Link" href="/#Projects">PROJECTS</a>
              <a className="Nav-Link" href="/#About">ABOUT</a>
              <a className="Nav-Link" href="/#Contact">CONNECT</a>
              <a className="Nav-Link" href="https://github.com/GarrettSidle" target="_blank">GITHUB</a>
            </div>
          </div>
        </nav>
      </div>
    );
  }


}
export default Navigation;
