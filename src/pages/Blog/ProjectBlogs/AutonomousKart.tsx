import { Component } from "react";

import "../Blog.css";
import ProjectCard from "../../../components/ProjectCard/ProjectCard";
import { ProjectLink } from "../../../models/Project";

type BlogProps = {
    links: ProjectLink[];
    tags: string[];
};

export class AutonomousKart extends Component<BlogProps> {
    public render() {
        return (
            <div className="Blog-Post">

                <h1><strong className="Orange">Autonomous</strong> Go-Kart</h1>
                <div className="Project-Tags">
                    {this.props.tags.map((tag: string, index: number) => (
                        <div key={index} className="Project-Tag">{"</ " + tag + " >"}</div>
                    ))}
                </div>
                <div className="Blog-Links">{ProjectCard.getProjectLinks(this.props.links)}</div>


                <div className="Image-Container">
                    <img src={'/assets/Projects/Autonomous-Kart/Kart.jpg'} />
                </div>

                <p>
                    As part of my <strong>Senior Design Capstone at Miami University</strong>, I’m leading the software development for an
                    <strong> autonomous go-kart </strong> a self-driving vehicle designed to compete in the
                    <strong> Autonomous Karting Series (AKS) at Purdue University</strong>. This project integrates cutting-edge embedded systems,
                    machine learning, and real-time control to create a high-performance autonomous racer.
                </p>

                <div className="Image-Container">
                    <img src={'/assets/Projects/Autonomous-Kart/Overview.png'} />
                </div>


                <div>
                    <h3>Software</h3>
                    <h4>Camera</h4>
                    <p>
                        The kart is equipped with an <strong>OAK-D Pro</strong> camera, which captures both visual and depth information from the environment.
                    </p>

                    <div className="Image-Container">
                        <img src="/assets/Projects/Autonomous-Kart/CameraImage.png" alt="Raw camera feed" />
                        <p className="Image-Caption">Figure 1: Raw camera view from the OAK-D Pro.</p>
                    </div>

                    <p>
                        Using color masking and computer vision algorithms, the system detects traffic cones within the camera’s field of view.
                    </p>

                    <div className="Image-Container">
                        <img src="/assets/Projects/Autonomous-Kart/Mask.png" alt="Color masked image" />
                        <p className="Image-Caption">Figure 2: Color mask applied to detect cones.</p>
                    </div>

                    <p>
                        The camera also provides a depth map, allowing the system to estimate the distance to each object in view — a crucial element for path planning.
                    </p>

                    <div className="Image-Container">
                        <img src="/assets/Projects/Autonomous-Kart/Depth.png" alt="Depth map" />
                        <p className="Image-Caption">Figure 3: Depth map output from the OAK-D Pro camera.</p>
                    </div>
                    <div>
                        <h4>Lidar</h4>
                        <p>
                            Lidar is used to detect additional objects that may not be visible to the camera, providing a full 360° spatial understanding of the surroundings. This data complements the camera input by offering accurate range measurements to nearby obstacles.
                        </p>
                        <div className="Image-Container">
                            <img src={'/assets/Projects/Autonomous-Kart/Lidar.png'} />
                        </div>
                    </div>

                    <div>
                        <h4>Kart Controls</h4>
                        <p>
                            The combined camera and lidar data feed into a <strong>SLAM (Simultaneous Localization and Mapping)</strong> algorithm that creates a live map of the course. A centerline spline is then calculated from this map to determine the ideal path. Based on this, the system computes the required throttle percentage, steering angle, and braking force in real-time to keep the kart centered in its lane.
                        </p>
                        <div className="Image-Container">
                            <img src={'/assets/Projects/Autonomous-Kart/Slam.png'} />
                        </div>
                    </div>
                </div>

                <div>
                    <h3>Wiring</h3>
                    <h4>Controls</h4>
                    <div>
                        <p>
                            The autonomous kart's control system is designed around a modular and fault-tolerant architecture, powered primarily by a Raspberry Pi. It operates through three main diagrams: power distribution, control box, and the complete kart schematic.
                        </p>
                        <div className="Image-Container">
                            <img src={'/assets/Projects/Autonomous-Kart/ControlPanel.png'} />
                        </div>
                        <p>
                            <strong>Control Box:</strong><br />
                            The Raspberry Pi orchestrates all autonomous functions. It communicates with the steering servo via an Ethernet switch and manages emergency stopping (e-stop) through a photocoupler circuit. Throttle control is handled by a digitally controlled rheostat, while braking is achieved using an H-bridge that drives a linear actuator to engage the brake.
                        </p>
                        <div className="Image-Container">
                            <img src={'/assets/Projects/Autonomous-Kart/Sch_Controls.png'} />
                        </div>
                        <p>
                            <strong>Power Distribution:</strong><br />
                            The kart receives 48V from a bank of four 12V batteries in series. This is stepped down to 24V for system components. Separate regulators ensure isolated and clean power delivery to the Raspberry Pi, motor controller, and auxiliary electronics.
                        </p>
                        <div className="Image-Container">
                            <img src={'/assets/Projects/Autonomous-Kart/Sch_Power.png'} />
                        </div>
                        <p>
                            <strong>Full Kart Schematic:</strong><br />
                            In addition to the components above, the full schematic includes a motor controller, a solenoid relay for drive power control, and a wireless control interface for manual override. All systems are integrated with the estop circuit to allow for immediate shutdown.
                        </p>
                        <div className="Image-Container">
                            <img src={'/assets/Projects/Autonomous-Kart/Sch_Kart.png'} />
                        </div>
                        <p>
                            This setup ensures safe, real-time control during autonomous navigation, while providing the flexibility for wireless manual intervention during testing and emergencies.
                        </p>
                    </div>


                    <h4>Brakes</h4>
                    <div>
                        <p>
                            The brake pedal is actuated by a polarity-reversing DC linear actuator, which uses an <strong>L298N H-bridge</strong> to reverse voltage polarity and control the extension or retraction of the actuator shaft.
                        </p>
                    </div>
                    <div className="Image-Container">
                        <img src={'/assets/Projects/Autonomous-Kart/Brakes.png'} />
                    </div>
                    <h4>Throttle</h4>
                    <div>
                        <p>
                            The <strong>Alltrax 48300</strong> motor controller regulates the RPM of the DC motor using an analog input from a rheostat. The <strong>Raspberry Pi 5</strong> adjusts the rheostat's resistance via the <strong>Serial Peripheral Interface (SPI)</strong> to control the throttle.
                        </p>
                    </div>
                    <div className="Image-Container">
                        <img src={'/assets/Projects/Autonomous-Kart/Rheostat.png'} />
                    </div>
                    <h4>Steering</h4>
                    <div>
                        <p>
                            Steering is actuated by a <strong>Schneider ILA2</strong> servo motor and controlled via the <strong>Modbus TCP</strong> protocol using a <strong>Raspberry Pi 5</strong> running the <strong>PyModbus</strong> library.
                        </p>
                    </div>
                    <div className="Image-Container">
                        <img src={'/assets/Projects/Autonomous-Kart/SteeringMount.png'} />
                    </div>
                    <h4>Wireless Controls</h4>
                    <div>
                        <p>
                            The autonomous kart can be wirelessly controlled using the <strong>RadioMaster Boxer</strong> transmitter. A dedicated antenna, housed in an elevated control box, receives signals and transmits control data to an <strong>STM microcontroller</strong> featuring an <strong>ARM Cortex-M7</strong> processor via the <strong>SBUS (Serial Bus)</strong> protocol. The microcontroller then relays this information to the <strong>Raspberry Pi 5</strong> over <strong>UART</strong> communication.
                        </p>
                    </div>
                    <div className="Image-Container">
                        <img src={'/assets/Projects/Autonomous-Kart/WirelessPanel.png'} />
                    </div>
                </div>

                <h3>Conclusion</h3>
                <div>
                    <p>
                        The autonomous go-kart project successfully achieved core autonomous functions, including precise speed and steering control. Key challenges included integrating an <strong>industrial servo motor</strong> with a <strong>Raspberry Pi</strong> and implementing <strong>computer vision</strong> in a dynamic kart environment.
                    </p>
                    <p>
                        Although significant progress was made, the final kart did not meet race qualification standards in time for the <strong>Autonomous Karting Series (AKS)</strong>, preventing participation this year. However, the project establishes a strong foundation for future enhancements in object detection and race strategy.
                    </p>
                    <div className="Image-Container">
                        <img src={'/assets/Projects/Autonomous-Kart/Group.png'} />
                    </div>
                    <p>
                        With detailed documentation and modular design, this platform will serve as a valuable starting point for future students to iterate on and develop a fully competitive autonomous racing system.
                    </p>
                </div>

            </div>
        )

    }
}