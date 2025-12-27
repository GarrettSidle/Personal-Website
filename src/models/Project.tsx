export class Project {
    id: string;
    name: string;
    source: string;
    date: string;
    demo: string;
    imgPaths: string[];
    tags: string[];
    inProgress: Boolean;
  
    constructor(
      id: string,
      name: string,
      source: string,
      date: string,
      demo: string,
      imgPaths: string[],
      tags: string[],
      inProgress: boolean
    ) {
      this.id = id;
      this.name = name;
      this.source = source;
      this.date = date;
      this.demo = demo;
      this.imgPaths = imgPaths;
      this.tags = tags;
      this.inProgress = inProgress;
    }
  
  }
