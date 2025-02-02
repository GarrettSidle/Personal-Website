import { Component } from "react";

import "../Blog.css";


export class Mouseless extends Component<{}> {
    public render() {
        return (
            <div className="Blog-Post">
                <a href="https://github.com/GarrettSidle/Mouseless" target="blank">
                    <h1>Mouseless.us</h1>
                </a>

                <div className="Image-Container">
                    <img src={'/assets/Projects/Mouseless/Overview.png'} />
                </div>

                <p>
                    As a developer, speed and efficiency are critical when working with code. Traditional typing practice tools focus on raw words-per-minute,
                    but coding requires a different approach—one that emphasizes keybindings, syntax manipulation, and precision. That’s where <strong>Mouseless</strong> comes in.
                </p>

                <h2>What is Mouseless?</h2>

                <p>
                    Mouseless is a web-based typing practice platform designed specifically for developers. Unlike standard typing tests, it presents users with
                    <strong> real code snippets</strong> and requires them to modify the code to match a given output. This approach helps reinforce essential developer skills, including:
                </p>

                <ul>
                    <li><strong>Mastering keybindings</strong> for rapid navigation and editing</li>
                    <li><strong>Efficiently manipulating code</strong> without relying on a mouse</li>
                    <li><strong>Improving speed and accuracy</strong> in a real-world coding environment</li>
                </ul>

                <h2>Technology Stack</h2>

                <p>
                    Mouseless is built with scalability and performance in mind, leveraging a modern, efficient stack:
                </p>

                <ul>
                    <li><strong>Frontend:</strong> A <strong>React</strong> application providing a dynamic, responsive interface</li>
                    <li><strong>Backend:</strong> A <strong>Django</strong> API handling business logic and data management</li>
                    <li><strong>Database:</strong> <strong>PostgreSQL</strong> for handling most requests, ensuring robust data storage</li>
                    <li><strong>Caching:</strong> <strong>Redis</strong> is used exclusively for <strong>session ID validation</strong>, optimizing authentication performance</li>
                </ul>

                <p>
                    This architecture allows the system to scale efficiently, handling high user traffic without performance degradation.
                </p>

                <h2>Tracking Progress with Real Data</h2>

                <p>
                    Mouseless doesn’t just provide exercises—it also tracks detailed performance statistics over time. Users can view:
                </p>

                <ul>
                    <li><strong>Personal improvement trends</strong> based on speed and accuracy</li>
                    <li><strong>Community-wide averages</strong> for meaningful comparisons</li>
                    <li><strong>Historical data</strong> to measure long-term progress</li>
                </ul>

                <p>
                    This analytical approach gives users clear insights into their efficiency gains and helps them refine their workflow.
                </p>

                <h2>Custom Authentication System</h2>

                <p>
                    Rather than relying on third-party authentication services, I implemented a <strong>custom authentication system</strong> using password hashing,
                    salting, and session-based authentication. This approach ensures security while integrating seamlessly with the <strong>session ID system</strong> backed by Redis.
                </p>
            </div>
        )

    }
}