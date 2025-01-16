import { Component } from "react";

import "../Blog.css";


export class EightBit extends Component<{}> {
    public render() {
        return (
            <div className="Blog-Post">
                <h1>8-Bit Single <strong className="Orange">Core</strong> Single <strong className="Orange">Cycle</strong> CPU</h1>
                <div className="Image-Container">
                    <img src={'/assets/Projects/8-Bit/Overview.png'} />
                </div>
                <p>
                    For this project, I built an 8-bit computer entirely on breadboards, inspired by Ben Eater’s designs. This computer serves as a hands-on exploration of computer architecture.
                </p>

                <h2>Modules</h2>

                <h3>Clock Module</h3>
                <div className="Image-Container">
                    <img src={'/assets/Projects/8-Bit/Sch-Clock.png'} />
                </div>
                <p>
                    The clock module uses a 555 timer in astable mode to generate clean pulses by charging and discharging a capacitor. This provides reliable timing for the computer, with manual and automatic modes for flexibility.
                </p>


                <h3>Control Unit</h3>
                <div className="Image-Container">
                    <img src={'/assets/Projects/8-Bit/Sch-Control.png'} />
                </div>
                <p>
                    The control unit decodes instructions stored as assembly codes in ROM chips and sequentially reads them to execute the desired program. Built-in flags, such as Zero and Carry, are set by the ALU and enable conditional jumps, allowing for loops and branching to specific memory addresses for more dynamic program control.
                </p>

                <h3>ALU (Arithmetic Logic Unit)</h3>
                <div className="Image-Container">
                    <img src={'/assets/Projects/8-Bit/Sch-ALU.png'} />
                </div>
                <p>
                    The ALU features dedicated buses for its A and B inputs, enabling efficient data handling. It supports operation codes for addition, subtraction, bitwise operations (AND, OR, XOR, NOT), and left/right shifts, providing robust and flexible computation capabilities.
                </p>

                <h3>Registers</h3>
                <div className="Image-Container">
                    <img src={'/assets/Projects/8-Bit/Sch-Register.png'} />
                </div>
                <p>
                    The computer features general-purpose 8-bit registers built using 74LS173 chips. These registers store data temporarily during computations and operations. The instruction register holds the current operation being executed by the control unit. It behaves similarly to a main register but is dedicated to storing the instruction fetched from memory, allowing the control unit to generate the necessary control signals effectively.
                </p>

                <h3>Program Counter</h3>
                <div className="Image-Container">
                    <img src={'/assets/Projects/8-Bit/Sch-Counter.png'} />
                </div>
                <p>
                    Keeps track of the current instruction being executed, with options to increment, reset, or jump to a specific memory address.
                </p>

                <h3>Memory</h3>
                <h4>MAR (Memory Address Register)</h4>
                <div className="Image-Container">
                    <img src={'/assets/Projects/8-Bit/Sch-MAR.png'} />
                </div>
                <p>
                    The MAR holds the address of the current memory location to be accessed. The address bits can be manually set via DIP switches, allowing for easy address selection directly from the board.
                </p>
                <h4>RAM (Random Access Memory)</h4>
                <div className="Image-Container">
                    <img src={'/assets/Projects/8-Bit/Sch-RAM.png'} />
                </div>
                <p>
                    The RAM module stores runtime data and allows for 16 separate 8-bit strings, each capable of holding 8 bits of data. The data values in each string can be manually entered using DIP switches, providing a convenient way to control and modify data during testing and debugging.
                </p>

                <h3>Output Module</h3>
                <div className="Image-Container">
                    <img src={'/assets/Projects/8-Bit/Sch-Output.png'} />
                </div>
                <p>
                    The output system features four 7-segment displays, which are driven by a single EEPROM chip. This chip stores the necessary data to display the correct digits on each display. The displays are multiplexed, meaning by cycling through each display at a high frequency, the system creates the illusion of continuous display output across all four panels.
                </p>

                <h3>Bus System</h3>
                <div className="Image-Container">
                    <img src={'/assets/Projects/8-Bit/Sch-Overview.png'} />
                </div>
                <p>
                    Serves as the backbone for communication between modules, using tri-state buffers to prevent signal interference. Each module has a dedicated 74LS245 chip to control the flow in and out of the bus.
                </p>

                <h2>Conclusion</h2>

                <p>
                    This project deepened my understanding of computer architecture, from the ALU to memory and output modules. I successfully wrote a program to compute Fibonacci numbers, demonstrating the power of the custom-built system. The experience honed my skills in hardware design, software integration, and optimization, reinforcing my ability to solve complex problems through both hardware and software.
                </p>
            </div>
        )

    }
}