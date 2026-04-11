import { Component } from "react";

import "../Blog.css";
import ProjectCard from "../../../components/ProjectCard/ProjectCard";
import { ProjectLink } from "../../../models/Project";

type BlogProps = {
  links: ProjectLink[];
  tags: string[];
};

export class HexChessEngine extends Component<BlogProps> {
  public render() {
    return (
      <div className="Blog-Post">
        <h1>
          Hexagonal Chess <strong className="Orange">Engine</strong> (C++)
        </h1>
        <div className="Project-Tags">
          {this.props.tags.map((tag: string, index: number) => (
            <div key={index} className="Project-Tag">
              {"</ " + tag + " >"}
            </div>
          ))}
        </div>
        <div className="Blog-Links">
          {ProjectCard.getProjectLinks(this.props.links)}
        </div>
        <p>
          This engine is used by the Hexagonal Chess WPF application. The
          original GUI project can be found{" "}
          <a href="/Blog?id=hexagonal-chess-app" rel="noopener noreferrer">
            here
          </a>
          .
        </p>
        <div className="Image-Container">
          <img
            src={"/assets/Projects/HexChessEngine/RadialTree.png"}
            alt="Radial tree at depth 4"
          />
        </div>
        <h2>How the Hexagonal Chess Bot Thinks</h2>
        <p>
          Building a chess bot comes down to turning a messy board position into
          math, then using that math to predict the future. At its core, the bot
          is just evaluating positions and exploring possible moves as
          efficiently as possible.
        </p>
        <h3>Turning a Chess Position into a Number</h3>
        <p>
          The first thing the bot needs is a way to judge how good a position
          is. In this bot, that evaluation is done purely through material point
          values. Every piece on the board is assigned a numeric value, and the
          total position score is just the sum of those values for both sides.
        </p>
        <p>A typical point system might look like this:</p>
        <table>
          <thead>
            <tr>
              <th>Piece</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Pawn</td>
              <td>1</td>
            </tr>
            <tr>
              <td>Knight</td>
              <td>3</td>
            </tr>
            <tr>
              <td>Bishop</td>
              <td>3</td>
            </tr>
            <tr>
              <td>Rook</td>
              <td>5</td>
            </tr>
            <tr>
              <td>Queen</td>
              <td>9</td>
            </tr>
            <tr>
              <td>King</td>
              <td>1000</td>
            </tr>
          </tbody>
        </table>
        <p>
          The king's value is intentionally absurdly high and ideally it would
          be infinitely high. This ensures that no amount of material gain is
          ever considered more important than losing the king. The final
          evaluation is a single number: positive if the position favors one
          side, negative if it favors the other.
        </p>
        <p>
          This simplicity makes the evaluation fast, which is critical when the
          bot needs to analyze thousands of positions per move.
        </p>
        <h3>Predicting the Future with Move Trees</h3>
        <p>
          Once the bot can score a position, it needs to look ahead. This is
          done by building a game tree, where each node represents a board
          position and each edge represents a legal move. From the current
          position, the bot simulates all possible moves, then all possible
          replies, and so on.
        </p>
        <p>
          To decide which move is best, the bot uses the{" "}
          <strong>minimax algorithm</strong>. Minimax assumes that both players
          will always choose the move that is best for themselves. When it's the
          bot's turn, it tries to maximize the evaluation score; when it's the
          opponent's turn, it assumes they will minimize it.
        </p>
        <p>
          <strong>Minimax tree</strong>
        </p>
        <div className="Image-Container">
          <img
            src={"/assets/Projects/HexChessEngine/MinimaxTree.png"}
            alt="Minimax tree"
          />
        </div>
        <p>
          Above is a heavily simplified version of a tree, where white
          represents all even levels of the tree and black is all odd levels. In
          this tree white will always pick the move that brings the evaluation
          in the positive direction and black will do the opposite. It is
          important to note that in this example black is the first to move and
          only has two possible options in terms of movement. On a hexagonal
          board players have an average of around 140 possible moves at any
          given time if all pieces are still on the board. Making this a very
          large search tree.
        </p>
        <p>
          The search depth plays a huge role here. A deeper search means the bot
          can see further into the future, but the number of positions grows
          exponentially with each extra ply.
        </p>
        <p>
          <strong>Example</strong>
        </p>
        <p>
          Given this board position (white to move), there are 19 possible moves
          for white (12 knight moves and 7 kings moves). If the bot was
          evaluating this position on a depth setting of 1 the move that would
          result in the greatest value would take the bishop (KxB H7 E6)
          resulting in a 3 point gain compared to the tree root.
        </p>
        <p>
          <strong>Depth 1</strong>
        </p>
        <div className="Image-Container">
          <img
            src={"/assets/Projects/HexChessEngine/Depth1.png"}
            alt="Depth 1"
          />
        </div>
        <p>
          Although if the bot was instead set at a depth value of 2, it would
          look deeper and see the move Knight I10 (K H7 I10). Although this does
          not result in an immediate point increase it does put Black into a
          forced king capture on the following move since Black has no moves to
          block the capture.
        </p>
        <p>
          <strong>Depth 2</strong>
        </p>
        <div className="Image-Container">
          <img
            src={"/assets/Projects/HexChessEngine/Depth2.png"}
            alt="Depth 2"
          />
        </div>
        <p>
          On a depth setting of 2 the engine would compare all of the possible
          moves stemming from the root in this case. A +3 for taking the bishop,
          a +1000 for taking the king, and +0 for every other move. The engine
          then simply picks the highest possible score and makes the move Knight
          I10.
        </p>
        <p>
          These calculations take place for every possible move up to the engine
          max node count, looking at every board position stemming from the root
          position and comparing the outcomes.
        </p>
        <p>
          To keep things manageable, the bot also has a node limit, typically
          somewhere between 100 and 5000 positions per move. For comparison,
          modern chess engines evaluate millions of nodes for a single position.
          At that scale, the main bottleneck becomes raw CPU power, which is why
          serious engines rely heavily on optimizations.
        </p>
        <h3>Optimizations</h3>
        <p>
          As the search tree grows, evaluating every possible position quickly
          becomes infeasible. To push the bot further without increasing the
          node limit, several classic chess-engine optimizations are used.
        </p>
        <h4>Transposition Tables</h4>
        <p>
          Many different move sequences can lead to the same board position.
          Without optimization, the bot would evaluate these identical positions
          multiple times, wasting valuable search time. A transposition table
          fixes this by caching the evaluation of previously seen positions and
          reusing them whenever the same position appears again.
        </p>
        <p>
          To make this efficient, the bot uses <strong>Zobrist hashing</strong>.
          Each piece–square combination is assigned a random 64-bit number. The
          hash of a board position is created by XOR-ing the values for all
          pieces currently on the board. This allows the bot to generate a
          near-unique identifier for a position extremely quickly.
        </p>
        <p>When the bot encounters a position, it:</p>
        <ol>
          <li>Computes the Zobrist hash</li>
          <li>Checks if that hash exists in the transposition table</li>
          <li>
            Reuses the stored evaluation if available, instead of recalculating
            it
          </li>
        </ol>
        <p>
          This dramatically reduces duplicated work, especially in deeper
          searches where transpositions are common.
        </p>
        <p>
          <strong>Example</strong>
        </p>
        <p>
          In the following example the final positions for both board A and B
          are identical even though they took separate steps to reach those
          positions. In this case the bot would hash the two positions and
          notice the overlap and rather than making 2 new nodes it would simply
          point both cases to the same node. This prevents duplicate
          calculations being done for the positions of child nodes.
        </p>
        <div className="Image-Container">
          <img
            src={"/assets/Projects/HexChessEngine/TranspositionTable.png"}
            alt="Transposition table"
          />
        </div>
        <h4>Iterative Deepening</h4>
        <p>
          Rather than immediately searching to the maximum depth, the bot uses{" "}
          <strong>iterative deepening</strong>. It first searches to depth 1,
          then depth 2, then depth 3, and so on until it reaches the depth or
          node limit.
        </p>
        <p>
          While this may seem inefficient at first, it provides two major
          benefits:
        </p>
        <ul>
          <li>
            Results from earlier, shallower searches are reused to guide deeper
            searches
          </li>
          <li>
            The bot always has a "best move so far" available if the search must
            be stopped early
          </li>
        </ul>
        <p>
          Iterative deepening also greatly improves move ordering, which makes
          other optimizations, especially alpha–beta pruning, far more
          effective.
        </p>
        <h4>Killer Move Heuristic</h4>
        <p>
          The <strong>killer move heuristic</strong> is based on the idea that
          some moves are so strong they tend to cause cutoffs repeatedly at the
          same depth of the search tree.
        </p>
        <p>
          When a move causes a beta cutoff during search, it is stored as a
          killer move for that depth. In future nodes at the same depth, the bot
          tries these killer moves early, before exploring other options.
        </p>
        <p>
          By testing historically strong moves first, the bot increases the
          likelihood of early cutoffs, reducing the total number of nodes that
          need to be searched.
        </p>
        <h4>Alpha–Beta Pruning</h4>
        <p>
          <strong>Alpha–beta pruning</strong> is an optimization applied
          directly to the minimax algorithm. It tracks two values:
        </p>
        <ul>
          <li>
            <strong>Alpha</strong>: the best score the maximizing player can
            guarantee
          </li>
          <li>
            <strong>Beta</strong>: the best score the minimizing player can
            guarantee
          </li>
        </ul>
        <p>
          If the bot determines that a branch cannot possibly improve the
          current outcome, because it is already worse than a known alternative,
          that branch is discarded without further exploration.
        </p>
        <p>
          On top of standard alpha–beta pruning, this bot applies an additional
          domain-specific culling rule. Any subtree that is at least 4 plies
          deep and has an evaluation that differs from the root by 10 or more
          points is immediately pruned. Positions that diverge this far from the
          root are treated as unrealistic continuations, typically representing
          early blunders or lines a rational opponent would never allow.
        </p>
        <p>
          This aggressive pruning dramatically reduces the size of the search
          tree, keeping the engine fast under tight node limits. The downside is
          that sharp tactical ideas, such as queen sacrifices or long-term
          compensation plays, are unlikely to be discovered, since they often
          require temporarily accepting a large material deficit.
        </p>
        <p>
          For a scrappy, lightweight engine, however, this tradeoff is
          acceptable. The bot sacrifices some tactical brilliance in exchange
          for speed, stability, and reasonably strong practical play.
        </p>
        <h3>System Overview</h3>
        <p>
          The diagram shows how the Hexagonal Chess bot works at a high level. A
          GUI talks to the engine by sending text commands in and reading
          replies out. The control loop handles that conversation: it reads what
          you type (like <code>glinski</code> to start a game or{" "}
          <code>a1b2</code> to make a move), keeps an eye on the connection via
          heartbeats, and drives the rest of the system. The protocol layer
          translates human-style board positions and moves into the format the
          engine uses internally. The board is the core chess state, the pieces
          and their positions. When it's the bot's turn, the search module
          explores possible moves and picks the best one, using move generation
          and position evaluation under the hood. After each move, the bot can
          optionally export its thinking to a file for visualization. In short:
          you send commands, the engine parses them, updates the board, searches
          for the best reply, and sends it back.
        </p>
        <div className="Image-Container">
          <img
            src={"/assets/Projects/HexChessEngine/SystenDiagram.png"}
            alt="System diagram"
          />
        </div>
        <h3>Conclusion</h3>
        <p>
          Overall this chess bot is a resounding success—I am only able to beat
          it when it is at or near its lowest max node value. I encourage anyone
          interested in hexagon chess to check it out.
        </p>
        <h3>Captures</h3>
        <p>
          <strong>Radial representation of bot's tree at depth = 4</strong>
        </p>
        <div className="Image-Container">
          <img
            src={"/assets/Projects/HexChessEngine/RadialTree.png"}
            alt="Radial tree"
          />
        </div>
        <figure className="Blog-Figure">
          <img
            src={"/assets/Projects/HexChessEngine/Overview.png"}
            alt="Engine integration overview"
          />
          <figcaption>
            The engine exposes a stdin/stdout protocol; the radial tree above
            is exported search data, while this panel captures how the binary
            sits alongside the visualization tooling.
          </figcaption>
        </figure>
      </div>
    );
  }
}
