import "./App.css";
import { PureComponent } from "react";
import React from "react";

import { createBrowserHistory } from "history";

import { Navigation } from "./components/Navigation/Navigation";
import "./App.css";
import { Route, Routes, Outlet } from "react-router-dom";
import Projects from "./pages/Projects/Projects";
import Layout from "./pages/Home/Layout";

export const history = createBrowserHistory();

export class App extends PureComponent<{}> {
  public render() {
    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<NavLayout />}>
            <Route index element={<Layout />} />
            <Route path="home" element={<Layout />} />
            <Route path="Projects" element={<Projects />} />
          </Route>
        </Routes>
      </div>
    );
  }
}

function NavLayout() {
  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  );
}

export default App;
