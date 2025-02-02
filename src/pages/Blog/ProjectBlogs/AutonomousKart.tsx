import { Component } from "react";

import "../Blog.css";


export class AutonomousKart extends Component<{}> {
    public render() {
        return (
            <div className="Blog-Post">
                <h1>Autonomous Go-Kart</h1>

                <div className="Image-Container">
                    <img src={'/assets/Projects/Autonomous-Kart/Overview.png'} />
                </div>

                <p>
                    As part of my <strong>Senior Design Capstone at Miami University</strong>, I’m leading the software development for an 
                    <strong> autonomous go-kart </strong> a self-driving vehicle designed to compete in the
                    <strong> Autonomous Karting Series (AKS) at Purdue University</strong>. This project integrates cutting-edge embedded systems,
                    machine learning, and real-time control to create a high-performance autonomous racer.
                </p>

                <h2>Key Features</h2>

                <h3>Remote Control & Manual Override</h3>
                <p>
                    The kart can be operated remotely using a <strong>C# application</strong>, allowing for real-time manual control before full autonomy is enabled.
                </p>

                <h3>LiDAR-Based Navigation</h3>
                <p>
                    Equipped with <strong>LiDAR sensors</strong>, the kart scans its environment and uses advanced algorithms to detect obstacles and plan its path.
                </p>

                <h3>Machine Learning for Object Detection</h3>
                <p>
                    A <strong>TensorFlow-trained neural network</strong> processes sensor data to classify objects and make real-time driving decisions.
                </p>

                <h3>PostgreSQL Data Logging</h3>
                <p>
                    All sensor readings, telemetry, and decisions are logged in a <strong>PostgreSQL database</strong> for performance analysis and optimization.
                </p>

                <h3>Embedded System Optimization</h3>
                <p>
                    The control logic is optimized for <strong>low-latency decision-making</strong>, ensuring smooth and efficient operation on the track.
                </p>

                <h2>Software Application</h2>

                <div className="Image-Container">
                    <img src={'/assets/Projects/Autonomous-Kart/Software.png'} />
                </div>

                <p>
                    The <strong>C# control application</strong> serves as both a remote control interface and a debugging tool. Key functionalities include:
                </p>

                <ul>
                    <li><strong>Real-time telemetry visualization</strong> (speed, position, and sensor data)</li>
                    <li><strong>Live video feed integration</strong> for manual monitoring</li>
                    <li><strong>AI-assisted decision logging</strong> for post-race analysis</li>
                    <li><strong>Remote firmware updates</strong> for quick software enhancements</li>
                </ul>

                <h2>Competition & Testing</h2>

                <p>
                    Our kart will compete in the <strong>Autonomous Karting Series (AKS) at Purdue University</strong>, where teams race autonomous
                    vehicles in a high-speed, precision-based competition. Testing and tuning are ongoing to ensure maximum efficiency on race day.
                </p>


            </div>
        )

    }
}