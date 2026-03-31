import type { Project } from "../../models/Project";

import hexChessEngineBotPlay from "../../assets/videos/HexChessEngine-BotPlay.mp4";
import mouselessHome from "../../assets/videos/Mouseless-Home.mp4";
import mouselessShortcuts from "../../assets/videos/Mouseless-Shortcuts.mp4";
import rcCarMoving from "../../assets/videos/RC-Car-Moving.mp4";

const rawProjects: Project[] = require("./ProjectsData.json");

const videoOverrides: Record<string, string> = {
  "Projects/HexChessEngine/BotPlay.mp4": hexChessEngineBotPlay,
  "Projects/Mouseless/Home.mp4": mouselessHome,
  "Projects/Mouseless/Shortcuts.mp4": mouselessShortcuts,
  "Projects/RC-Car/Moving.mp4": rcCarMoving,
};

export const projectsData: Project[] = rawProjects.map((project) => ({
  ...project,
  imgPaths: project.imgPaths.map((p) => videoOverrides[p] ?? p),
}));

