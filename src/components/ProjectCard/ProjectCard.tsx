import React, { Component } from "react";

import "./ProjectCard.css";
import { FaGithub, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdLiveTv } from "react-icons/md";
import { Project, ProjectLink } from "../../models/Project";
import { publicAssetUrl } from "../../utils/publicAssetUrl";

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
  private cardRef: React.RefObject<HTMLAnchorElement>;

  constructor(props: ProjectCardProps) {
    super(props);
    this.state = {
      currentImageIndex: 0,
    };
    this.firstImageRef = React.createRef();
    this.cardRef = React.createRef();
  }

  private getImageSrc(mediaPath: string): string {
    if (mediaPath.startsWith("http://") || mediaPath.startsWith("https://")) {
      return mediaPath;
    }

    if (mediaPath.startsWith("/")) {
      return publicAssetUrl(mediaPath);
    }

    return publicAssetUrl(`/assets/${mediaPath}`);
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

  private handleFirstImageLoad = () => {
    if (
      !this.state.imageWidth &&
      !this.state.imageHeight &&
      this.firstImageRef.current
    ) {
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
    if (this.firstImageRef.current instanceof HTMLImageElement) {
      if (this.firstImageRef.current.complete) {
        this.measureFirstImage();
      }
    }
  }

  private measureFirstImage() {
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

  private getCircularOffset(
    index: number,
    currentIndex: number,
    length: number
  ) {
    if (length <= 1) return 0;
    let offset = index - currentIndex;
    const half = length / 2;
    if (offset > half) offset -= length;
    if (offset < -half) offset += length;
    return offset;
  }

  public render() {
    const { project } = this.props;
    const { currentImageIndex } = this.state;
    const hasMultipleImages = project.imgPaths.length > 1;

    return (
      <a
        className="Project-Card"
        href={`/Blog?id=${project.id}`}
        ref={this.cardRef}
      >
        <div className="Project-Title"> {project.name}</div>
        <div className="Project-Date"> {project.date}</div>

        {project.inProgress ? this.inProgress() : ""}

        <div className="Project-Image-Container">
          {project.imgPaths.map((mediaPath, index) => {
            const offset = this.getCircularOffset(
              index,
              currentImageIndex,
              project.imgPaths.length
            );
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
                src={this.getImageSrc(mediaPath)}
                alt={`${project.name} — slide ${index + 1}`}
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
        {ProjectCard.getProjectLinks(project.links)}
      </a>
    );
  }

  public static getProjectLinks(links: ProjectLink[]) {
    return (
      <div className="Project-Links">
        {links
          .filter((link) => link.url !== "")
          .map((link, index) => ProjectCard.renderLink(link, index))}
      </div>
    );
  }

  private inProgress() {
    return <div className="In-Progress-Overlay">In Progress</div>;
  }

  public static renderLink(link: ProjectLink, key?: number) {
    const text = link.text ?? this.getDefaultText(link.logo);
    const icon = this.getIcon(link.logo);

    return (
      <a
        key={key}
        href={link.url}
        target="blank"
        rel="noreferrer"
        className="Project-Link-Anchor"
      >
        <div className="Project-Link">
          <div>{icon}</div>
          <div>
            <div className="Link-Desc">{text}</div>
          </div>
        </div>
      </a>
    );
  }

  private static getIcon(logo: string) {
    switch (logo.toLowerCase()) {
      case "github":
        return <FaGithub className="Link-Img" color="white" />;
      case "demo":
      case "live":
        return <MdLiveTv className="Link-Img" color="white" />;
      default:
        return <FaGithub className="Link-Img" color="white" />;
    }
  }

  private static getDefaultText(logo: string): string {
    switch (logo.toLowerCase()) {
      case "github":
        return "Source";
      case "demo":
      case "live":
        return "Demo";
      default:
        return "Link";
    }
  }
}
export default ProjectCard;
