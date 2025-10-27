import { Component } from "react";

import "../Blog.css";
import ProjectCard from "../../../components/ProjectCard/ProjectCard";

type BlogProps = {
  source: string;
  demo: string;
};

export class OWALT extends Component<BlogProps> {
  public render() {
    return (
      <div className="Blog-Post">
        <h1>
          <strong>Overwatch</strong> Account Tracker
        </h1>
        <div className="Blog-Links">
          {ProjectCard.getProjectLinks(this.props.source, this.props.demo)}
        </div>
        <div className="Image-Container">
          <img src={"/assets/Projects/OWALT/Tracker.png"} />
        </div>

        <h2>Project Overview</h2>
        <p>
          This project is an <strong>Overwatch account tracker</strong> that
          monitors and stores the current ranks of selected accounts using the{" "}
          <strong>Overfast API</strong>. It was built with a focus on{" "}
          <strong>data management, caching, and secure access</strong>. The
          tracker retrieves live rank data, stores it in a{" "}
          <strong>local cache</strong>, and automatically falls back to cached
          data when the API is unavailable. This allows for persistent
          historical tracking while minimizing unnecessary API calls.
        </p>

        <h2>Implementation Details</h2>
        <p>
          Each account record includes rank information and tags that allow the
          user to filter accounts by rank, alphabetically, or based on
          associated tags. Sensitive details are <strong>encrypted</strong> and
          require a user-provided <strong>decryption key</strong> to access,
          enabling secure data visibility without a full authentication system.
        </p>
        <p>
          The application supports <strong>smart API polling</strong> for
          efficient updates, <strong>local caching</strong> for offline access
          and historical tracking, and <strong>real-time filtering</strong> by
          rank, name, or tag. It also includes{" "}
          <strong>key-based encryption</strong> for restricted data access and
          is fully <strong>hosted on my personal website</strong>, seamlessly
          integrated into the existing frontend.
        </p>
      </div>
    );
  }
}
