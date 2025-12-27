import React, { Component } from "react";

import "./ProjectCard.css";
import { FaGithub, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdLiveTv } from "react-icons/md";
import { Project } from "../../models/Project";

interface ProjectCardProps {
  project: Project;
}

interface ProjectCardState {
  currentImageIndex: number;
  imageWidth?: number;
  imageHeight?: number;
}

export class ProjectCard extends Component<ProjectCardProps, ProjectCardState> {
  private firstImageRef: React.RefObject<HTMLImageElement>;

  constructor(props: ProjectCardProps) {
    super(props);
    this.state = {
      currentImageIndex: 0,
    };
    this.firstImageRef = React.createRef();
  }

  private handlePreviousImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState((prevState) => ({
      currentImageIndex:
        prevState.currentImageIndex === 0
          ? this.props.project.imgPaths.length - 1
          : prevState.currentImageIndex - 1,
    }));
  };

  private handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState((prevState) => ({
      currentImageIndex:
        prevState.currentImageIndex === this.props.project.imgPaths.length - 1
          ? 0
          : prevState.currentImageIndex + 1,
    }));
  };

  private handleFirstImageLoad = (
    e: React.SyntheticEvent<HTMLImageElement>
  ) => {
    if (
      !this.state.imageWidth &&
      !this.state.imageHeight &&
      this.firstImageRef.current
    ) {
      // Use requestAnimationFrame to ensure measurement happens after layout
      requestAnimationFrame(() => {
        if (this.firstImageRef.current) {
          const rect = this.firstImageRef.current.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            this.setState({
              imageWidth: rect.width,
              imageHeight: rect.height,
            });
          }
        }
      });
    }
  };

  public componentDidMount() {
    // If the first image is already loaded, measure it after layout
    if (this.firstImageRef.current && this.firstImageRef.current.complete) {
      requestAnimationFrame(() => {
        if (this.firstImageRef.current) {
          const rect = this.firstImageRef.current.getBoundingClientRect();
          if (
            rect.width > 0 &&
            rect.height > 0 &&
            !this.state.imageWidth &&
            !this.state.imageHeight
          ) {
            this.setState({
              imageWidth: rect.width,
              imageHeight: rect.height,
            });
          }
        }
      });
    }
  }

  public render() {
    const { project } = this.props;
    const { currentImageIndex } = this.state;
    const hasMultipleImages = project.imgPaths.length > 1;

    return (
      <a className="Project-Card" href={`/Blog?id=${project.id}`}>
        <div className="Project-Title"> {project.name}</div>
        <div className="Project-Date"> {project.date}</div>

        {project.inProgress ? this.inProgress() : ""}

        <div className="Project-Image-Container">
          {project.imgPaths.map((imgPath, index) => {
            const offset = index - currentImageIndex;
            const isVisible = Math.abs(offset) <= 1;

            if (!isVisible) return null;

            const isActive = index === currentImageIndex;
            const isFirstImage = index === 0;
            const { imageWidth, imageHeight } = this.state;

            const baseStyle: React.CSSProperties = {
              opacity: 1,
            };
            const hasSized = imageWidth && imageHeight;
            if (hasSized) {
              baseStyle.width = `${imageWidth}px`;
              baseStyle.height = `${imageHeight}px`;
              baseStyle.objectFit = "contain";
            }

            const style = isActive
              ? baseStyle
              : {
                  ...baseStyle,
                  zIndex: project.imgPaths.length - Math.abs(offset),
                  transform: `translateX(calc(-50% + ${
                    offset * 20
                  }px)) scale(0.95)`,
                  opacity: 0.85,
                };

            return (
              <img
                key={index}
                ref={isFirstImage ? this.firstImageRef : undefined}
                src={`/assets/${imgPath}`}
                alt={`${project.name} - Image ${index + 1}`}
                className={`Project-Image ${isActive ? "active" : ""} ${
                  offset !== 0 ? "behind" : ""
                } ${hasSized ? "sized" : ""}`}
                style={style}
                onLoad={isFirstImage ? this.handleFirstImageLoad : undefined}
              />
            );
          })}

          {hasMultipleImages && (
            <>
              <button
                className="Project-Image-Nav Project-Image-Nav-Left"
                onClick={this.handlePreviousImage}
                aria-label="Previous image"
              >
                <FaChevronLeft />
              </button>
              <button
                className="Project-Image-Nav Project-Image-Nav-Right"
                onClick={this.handleNextImage}
                aria-label="Next image"
              >
                <FaChevronRight />
              </button>
            </>
          )}
        </div>

        <div className="Project-Tags">
          {project.tags.map((tag: any, index: number) => (
            <div key={index} className="Project-Tag">
              {"</ " + tag + " >"}
            </div>
          ))}
        </div>
        {ProjectCard.getProjectLinks(project.source, project.demo)}
      </a>
    );
  }

  public static getProjectLinks(source: string, demo: string) {
    return (
      <div className="Project-Links">
        {source !== "" ? ProjectCard.github(source) : ""}
        {demo !== "" ? ProjectCard.demo(demo) : ""}
      </div>
    );
  }

  private inProgress() {
    return <div className="In-Progress-Overlay">In Progress</div>;
  }

  public static github(source: string) {
    return (
      <a href={source} target="blank" rel="noreferrer">
        <div className="Project-Link">
          <div>
            <FaGithub className="Link-Img" color="white" />
          </div>
          <div>
            <div className="Link-Desc">Source</div>
          </div>
        </div>
      </a>
    );
  }

  public static demo(link: string) {
    return (
      <a
        className="Project-Link-Shell"
        href={link}
        target="blank"
        rel="noreferrer"
      >
        <div className="Project-Link">
          <MdLiveTv className="Link-Img" color="white" />
          <div>
            <div className="Link-Desc">Demo</div>
          </div>
        </div>
      </a>
    );
  }
}
export default ProjectCard;
