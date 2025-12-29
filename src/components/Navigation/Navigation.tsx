import { Component } from "react";

import "./Navigation.css";

const NavLinks = [
  {
    title: "Home",
    link: "/#Home",
    target: "",
  },
  {
    title: "Education",
    link: "/#Education",
    target: "",
  },
  {
    title: "Experience",
    link: "/#WorkExperience",
    target: "",
  },
  {
    title: "Projects",
    link: "/#Projects",
    target: "",
  },
  {
    title: "About",
    link: "/#About",
    target: "",
  },
  {
    title: "Connect",
    link: "/#Contact",
    target: "",
  },
  {
    title: "Github",
    link: "https://github.com/GarrettSidle",
    target: "blank",
  },
];
export class Navigation extends Component<{}, { navUnfolded: boolean }> {
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
      <div className={this.state.navUnfolded ? "Enabled" : ""}>
        <nav className="Navigation">
          <div className="Nav-Objects">
            <a href="/#Home" className="Nav-Brand">
              Garrett Sidle
            </a>
            <button
              className="Hamburger"
              onClick={() => {
                this.toggleNav();
              }}
            >
              ☰
            </button>
            <div className="Nav-Links">
              {NavLinks.map((NavLink) => (
                <a
                  key={NavLink.title}
                  target={NavLink.target}
                  href={NavLink.link}
                >
                  {NavLink.title.toLocaleUpperCase()}
                </a>
              ))}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
export default Navigation;
