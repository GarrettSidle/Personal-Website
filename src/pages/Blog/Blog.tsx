import { Component } from "react";

import "./Blog.css";


const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get('id');


export class Blog extends Component<{}> {
    public render() {
        return (
            <div className="Blog Page" id='Blog'>
                {this.getProject()}
            </div>
        );
    }


    private getProject() {
        switch (projectId) {
            case "word-ladder-analysis":
                return this.wordLadder();
            case "hexagonal-chess-app":
                return this.hexChess();
            case "personal-website":
                return this.personalWebsite();
            case "rc-car":
                return this.rcCar();
        }
    }

    private wordLadder() {
        return (
            <div className="Blog-Post Page">
                <a href="https://github.com/GarrettSidle/Word-Ladder" target="blank">
                    <h1>Analyzing Connections in a <strong className="Orange">Word Ladder</strong> Network Graph</h1>
                </a>
                <div className="Image-Container">
                    <img src={'/assets/Projects/WordLadder/5-Scrabble.png'} />
                </div>
                <h2>Project Overview</h2>
                <p>For anyone who's spent time on sites like <a href="https://www.sporcle.com/games/subcategory/wordladder">Sporcle</a>, you may have encountered word ladder quizzes. In these puzzles, you start with one word and transform it into another word by changing only one letter at a time, with each intermediate step also being a valid word.</p>
                <div className="Image-Container">
                    <img
                        src={'/assets/Projects/WordLadder/SporcleWordLadder.png'}
                        alt="Word-Ladder"
                    />
                </div>
                <p>Inspired by this idea, I decided to take on a data analysis project using word ladders to explore network theory. My goal was to build a word ladder network graph where each node is a word, and an edge connects two nodes if the words differ by just one letter.</p>
                <h2>Questions and Goals</h2>
                <p>Here are some of the key questions I aimed to answer:</p>
                <h3>1. Longest Shortest Path Between Words (Graph Diameter)</h3>
                <p>The diameter of a graph represents the longest of all shortest paths between pairs of nodes, indicating the maximum number of transformations needed to connect two words. This measure helps reveal the farthest "reachable" pairs in the network, giving insight into the network’s overall span.</p>
                <h3>2. Most Needed Intermediate Words (Betweenness Centrality)</h3>
                <p>Certain words may serve as crucial "bridges" within the network, connecting otherwise separate clusters of words. By measuring betweenness centrality, I identified words that frequently appear on the shortest paths between others. A high centrality score indicates that a word is essential in connecting different parts of the network.</p>
                <h3>3. Categories or Clusters Among the Words (Community Detection)</h3>
                <p>Visualizing the network often reveals clusters of related words, potentially based on themes, letter patterns, or parts of speech. Using community detection algorithms, I identified these clusters, which highlight commonalities and patterns within the network structure.</p>
                <h2>Defining “Words” for the Network</h2>
                <p>Initially, I considered using a full Scrabble dictionary, but it was unwieldy, containing many rare or obscure words. I chose the 12Dicts word list, a manageable dataset of common words, allowing for faster computation and focusing on familiar English words. I wrote a script to filter this list, export it to a CSV file, and clean out unnecessary entries.</p>
                <h2>Building the Graph Script</h2>
                <p>To build and analyze the word ladder network, I used NetworkX for core graph calculations, including shortest paths, betweenness centrality, and community detection.</p>
                <p>To check if words differ by just one letter, I represented each word as a unique byte array, encoding each letter as a distinct byte within an integer. Using a set of possible binary one-letter transformations, I quickly verified one-letter differences with a time complexity of <strong>O(n²)</strong> and space complexity of <strong>O(n)</strong>.</p>
                <h3>Example (Comparing "HAT" and "CAT"):</h3>
                <p>1. <strong>Convert</strong> each word to hexadecimal values:</p>
                <p className="Listed">"CAT": C = 0x02, A = 0x00, T = 0x130000 → Sum: 0x130002</p>
                <p className="Listed">"HAT": H = 0x07, A = 0x00, T = 0x130000 → Sum: 0x130007</p>
                <p>2. <strong>XOR</strong> the values: 0x130002 ^ 0x130007 = 0x000005</p>
                <p>3. <strong>Interpret</strong> Result: The XOR result 0x000005 shows a difference in only one byte, indicating a one-letter difference, which is confirmed by checking if 0x000005 is in pairChecker.</p>
                <h2>Graph Analysis with NetworkX and Louvain</h2>
                <p><strong>Shortest Path Calculation:</strong> Using NetworkX, I calculated shortest paths to determine the network's diameter and identify central words.</p>
                <p><strong>Betweenness Centrality:</strong> NetworkX’s betweenness_centrality() function highlighted important "bridge" words that connect clusters within the network.</p>
                <p><strong>Community Detection:</strong> Using the Louvain method, I detected communities in the graph, revealing clusters of closely related words.</p>
                <h2>Visualization with Gephi</h2>
                <p>The script exported the network data to Gephi for visualization. Below is an example of a 5-letter word network graph.</p>
                <div className="Image-Container">
                    <img
                        src={'/assets/Projects/WordLadder/5-12Dict.png'}
                        alt="Word-Ladder"
                    />
                </div>
                <h2>Results and Insights</h2>
                <h3>Longest Shortest Path</h3>
                <p>Measuring the network’s diameter revealed that the longest shortest path between any two words was surprisingly large, suggesting some words are quite distant in terms of single-letter transformations.</p>
                <p><strong>3-letter diameter path:</strong> PLY, PAY, BAY, BAD, BID, AID, ADD, ADO, AGO, EGO, EMO, EMU</p>
                <div className="Image-Container">
                    <img
                        src={'/assets/Projects/WordLadder/Diameter.png'}
                        alt="Word-Ladder"
                    />
                </div>
                <h4>Word Length Vs Network Diameter Table</h4>

                <table>
                    <thead>
                        <tr>
                            <th>Word Length</th>
                            <th>Network Diameter</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>3</td>
                            <td>11</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>16</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>29</td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>13</td>
                        </tr>
                        <tr>
                            <td>7</td>
                            <td>43</td>
                        </tr>
                        <tr>
                            <td>8</td>
                            <td>10</td>
                        </tr>
                    </tbody>
                </table>

                <h3>Key Intermediate Words</h3>
                <p>To identify the most important intermediates, we analyzed two factors: node degree (number of connections a word has) and betweenness centrality (frequency as a bridge between other words). Words like "AUDIO" and "HOUSE," which have high values in these measures, often contain vowels, making them versatile connectors in the network.</p>
                <h3>Word Categories and Clusters</h3>
                <p>Using the Louvain method, I detected communities in the word network, revealing clusters of words with similar structures or sounds. Typically, words with shared consonant patterns or suffixes, like "-ing," formed distinct groups. For three-letter words, clustering often reflects the central vowel, as in groups formed by the middle letter.</p>
                <div className="Image-Container">
                    <img
                        src={'/assets/Projects/WordLadder/3-12Dict2.png'}
                        alt="Word-Ladder"
                    />
                </div>
                <p>This project provided deep insights into word connections and network theory while enhancing my data analysis skills with NetworkX, Louvain, and Gephi.</p>
                <h2>Remaining Images</h2>
                <h3>12Dict Dataset</h3>
                <h4>3 Letter Words</h4>
                <div className="Image-Container">
                    <img
                        src={'/assets/Projects/WordLadder/3-12Dict.png'}
                        alt="Word-Ladder"
                    />
                </div>
                <h4>4 Letter Words</h4>
                <div className="Image-Container">
                    <img
                        src={'/assets/Projects/WordLadder/4-12Dict.png'}
                        alt="Word-Ladder"
                    />
                </div>
                <h4>5 Letter Words</h4>
                <div className="Image-Container">
                    <img
                        src={'/assets/Projects/WordLadder/5-12Dict.png'}
                        alt="Word-Ladder"
                    />
                </div>
                <h4>6 Letter Words</h4>
                <div className="Image-Container">
                    <img
                        src={'/assets/Projects/WordLadder/6-12Dict.png'}
                        alt="Word-Ladder"
                    />
                </div>
                <h3>Scrabble Dataset</h3>
                <h4>5 Letter Words</h4>
                <div className="Image-Container">
                    <img
                        src={'/assets/Projects/WordLadder/5-Scrabble.png'}
                        alt="Word-Ladder"
                    />
                </div>
                <h4>6 Letter Words</h4>
                <div className="Image-Container">
                    <img
                        src={'/assets/Projects/WordLadder/6-Scrabble.png'}
                        alt="Word-Ladder"
                    />
                </div>

            </div>
        )
    }

    private hexChess() {
        return (
            <div className="Blog-Post">
                <a href="https://github.com/GarrettSidle/Hexagonal-Chess-Application" target="blank">
                    <h1>Hexagonal <strong className="Orange">Chess</strong> Program in C#</h1>
                </a>
                <div className="Image-Container">
                    <img src={'/assets/Projects/HexagonalChess/Played Game.png'} />
                </div>
                <h2>Project Overview</h2>
                <p>This WPF application offers a fresh take on classic chess, bringing hexagonal chess variants—such as Glinski, McCooey, and Hexofen—to a digital platform. Designed with both single and multiplayer modes, it allows users to experience the complexity and strategy of hexagonal chess in an engaging and user-friendly format.</p>
                <h2>Software Architecture</h2>
                <p>The application is built with C#, leveraging WPF for a clean and responsive interface. It features a custom <strong>Breadth-Depth Search</strong> system for move validation, dynamically calculating available moves in real-time and adapting to hexagonal board mechanics. The <strong>modular architecture</strong> facilitates easy addition of new game variants and components, while a lightweight chess evaluation system assesses board positions to guide strategic decision-making.</p>
                <h2>Variants</h2>
                <div className="Image-Container">
                    <img src={'/assets/Projects/HexagonalChess/Settings.png'} />
                </div>
                <p>Three unique hexagonal chess variants are implemented: <strong>Glinski</strong>, <strong>McCooey</strong>, and <strong>Hexofen</strong>. Each variant retains its distinct rules and board layouts. The chess engine accommodates each variant’s specific rules, seamlessly adapting move validation and board rendering to suit the selected game type.</p>
                <div className="Images-Container">
                    <div className="Images-Title">Glinski</div>
                    <div className="Images-Title">McCooey</div>
                    <div className="Images-Title">Hexofren</div>
                </div>
                <div className="Images-Container">
                    <img src={'/assets/Projects/HexagonalChess/Glinski Board.png'} />
                    <img src={'/assets/Projects/HexagonalChess/McCooey Board.png'} />
                    <img src={'/assets/Projects/HexagonalChess/Hexofren Board.png'} />
                </div>
                <h2>Online Play</h2>
                <p>The application supports <strong>peer-to-peer</strong> multiplayer, allowing users to play against others with minimal setup. Using <strong>asynchronous communication</strong>, the game ensures smooth turns and state synchronization across devices. Advanced networking features, such as automatic reconnection enhance the multiplayer experience, making it intuitive and accessible.</p>
                <h2>Other Images</h2>
                <h4>Home Screen</h4>
                <div className="Image-Container">
                    <img src={'/assets/Projects/HexagonalChess/Home.png'} />
                </div>
                <h4>Result Screen</h4>
                <div className="Image-Container">
                    <img src={'/assets/Projects/HexagonalChess/Result Screen.png'} />
                </div>




            </div>
        )
    }

    private personalWebsite() {
        return (
            <div className="Blog-Post">
                <a href="https://github.com/GarrettSidle/Personal-Website" target="blank">
                    <h1><strong className="Orange">Personal</strong> Website</h1>
                </a>
                <div className="Image-Container">
                    <img src={'/assets/Projects/PersonalWebsite/Personal-Website.png'} />
                </div>
                <h2>Project Overview</h2>

                <p>This is my personal website, which you're currently viewing. It was built using <strong>React</strong> to create a smooth, dynamic, and <strong>mobile-responsive</strong> user interface. With an emphasis on performance, I kept external dependencies to a minimum, ensuring a fast and efficient browsing experience. The website showcases a clean, modern design, offering an intuitive navigation system and dynamic content rendering. Hosted on <strong>AWS</strong>, the site is designed for scalability and high availability, providing a reliable user experience. It serves as both a portfolio and a space for showcasing various projects, reflecting my skills in web development and software engineering.</p>
                <h2>Other Images</h2>
                <h4>Blog Page</h4>
                <div className="Image-Container">
                    <img src={'/assets/Projects/PersonalWebsite/Blog.png'} />
                </div>

            </div>
        )
    }

    private rcCar() {
        return (
            <div className="Blog-Post">
                <a href="https://github.com/GarrettSidle/RC-Car" target="blank">
                    <h1><strong>C++</strong> Remote Control Car</h1>
                </a>
                <div className="Image-Container">
                    <img src={'/assets/Projects/RC-Car/Car.png'} />
                </div>
                <h2>Project Overview</h2>
                <p>This project involves the construction of a remote-controlled car using an <strong>Arduino microcontroller</strong> and DC motors. The car is controlled via a wireless communication module, allowing for remote operation. C++ programming language is used to write the code for the Arduino, which is responsible for controlling the motors and receiving commands from the remote controller. The car's speed and direction can be adjusted using the remote, and it also includes features such as <strong>obstacle detection</strong> and <strong>automatic braking</strong>. The project demonstrates the integration of hardware and software to create a functional and user-friendly device.</p>
                <h2>Electrical Overview</h2>
                <div className="Image-Container">
                    <img src={'/assets/Projects/RC-Car/Electrical.png'} />
                </div>
            </div>
        )
    }
}

export default Blog;
