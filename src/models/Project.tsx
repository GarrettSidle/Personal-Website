export interface ProjectLink {
  url: string;
  text?: string | null;
  logo: string;
}

export class Project {
    id: string;
    name: string;
    links: ProjectLink[];
    date: string;
    imgPaths: string[];
    tags: string[];
    inProgress: Boolean;
  
    constructor(
      id: string,
      name: string,
      links: ProjectLink[],
      date: string,
      imgPaths: string[],
      tags: string[],
      inProgress: boolean
    ) {
      this.id = id;
      this.name = name;
      this.links = links;
      this.date = date;
      this.imgPaths = imgPaths;
      this.tags = tags;
      this.inProgress = inProgress;
    }
  
  }
