export class Project {
    id: string;
    name: string;
    source: string;
    date: string;
    demo: string;
    imgPath: string;
    tags: string[];
  
    constructor(
      id: string,
      name: string,
      source: string,
      date: string,
      demo: string,
      imgPath: string,
      tags: string[]
    ) {
      this.id = id;
      this.name = name;
      this.source = source;
      this.date = date;
      this.demo = demo;
      this.imgPath = imgPath;
      this.tags = tags;
    }
  
    static fromJSON(json: any): Project {
      return new Project(
        json.id,
        json.name,
        json.source,
        json.date,
        json.demo,
        json.imgPath,
        json.tags || [] // Default to an empty array if tags are not provided
      );
    }
  }
