import "./App.css";
import { PureComponent } from "react";
import React from "react";

import { createBrowserHistory } from "history";

import { Navigation } from "./components/Navigation/Navigation";
import "./App.css";
import { Route, Routes, Outlet } from "react-router-dom";
import Home from "./pages/Home/Home";
import Education from "./pages/Education/Education";
import Projects from "./pages/Projects/Projects";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";

export const history = createBrowserHistory();

export class App extends PureComponent<{}> {
  public render() {
    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="Education" element={<Education />} />
            <Route path="Projects" element={<Projects />} />
            <Route path="About" element={<About />} />
            <Route path="Contact" element={<Contact />} />
          </Route>
        </Routes>
      </div>
    );
  }
}

function Layout() {
  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  );
}

export default App;
