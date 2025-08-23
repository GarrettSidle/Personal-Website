import { Component } from "react";
import Navigation from "./components/Navigation/Navigation";
import Blog from "./pages/Blog/Blog";
import Layout from "./pages/Home/Layout";
import "./App.css";
import AltManager from "./pages/AltManager/AtlManager";

interface RouterState {
  currentPath: string;
}

class App extends Component<{}, RouterState> {
  constructor(props: any) {
    super(props);
    this.state = {
      currentPath: window.location.pathname, // Get the current path
    };
  }

  navigateTo = (path: any) => {
    window.history.pushState({}, "", path);
    this.setState({ currentPath: path });
  };

  componentDidMount() {
    window.onpopstate = () => {
      this.setState({ currentPath: window.location.pathname });
    };
  }

  componentWillUnmount() {
    window.onpopstate = null;
  }

  render() {
    let ComponentToRender;

    switch (this.state.currentPath) {
      case "/":
        ComponentToRender = Layout;
        break;
      case "/Blog":
        ComponentToRender = Blog;
        break;
      case "/AltManager":
        ComponentToRender = AltManager;
        break;
      default:
        ComponentToRender = () => <div>404 Not Found</div>;
    }

    return (
      <div className="App">
        <Navigation />
        <ComponentToRender />
      </div>
    );
  }
}

export default App;
