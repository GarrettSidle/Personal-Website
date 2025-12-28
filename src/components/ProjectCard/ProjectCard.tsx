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
  private firstMediaRef: React.RefObject<HTMLImageElement | HTMLVideoElement>;
  private videoRefs: Map<number, React.RefObject<HTMLVideoElement>>;
  private cardRef: React.RefObject<HTMLAnchorElement>;

  constructor(props: ProjectCardProps) {
    super(props);
    this.state = {
      currentImageIndex: 0,
    };
    this.firstMediaRef = React.createRef();
    this.videoRefs = new Map();
    this.cardRef = React.createRef();

    // Initialize video refs for all videos (except index 0, which uses firstMediaRef)
    props.project.imgPaths.forEach((path, index) => {
      if (this.isVideo(path) && index !== 0) {
        this.videoRefs.set(index, React.createRef());
      }
    });
  }

  private isVideo(path: string): boolean {
    const videoExtensions = [".mp4", ".webm", ".ogg", ".mov", ".avi"];
    const lowerPath = path.toLowerCase();
    return videoExtensions.some((ext) => lowerPath.endsWith(ext));
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

  private handleFirstMediaLoad = () => {
    if (
      !this.state.imageWidth &&
      !this.state.imageHeight &&
      this.firstMediaRef.current
    ) {
      // Use requestAnimationFrame to ensure measurement happens after layout
      requestAnimationFrame(() => {
        if (this.firstMediaRef.current) {
          const rect = this.firstMediaRef.current.getBoundingClientRect();
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

  private playActiveVideo = () => {
    const { currentImageIndex } = this.state;
    const { imgPaths } = this.props.project;

    if (
      currentImageIndex >= 0 &&
      currentImageIndex < imgPaths.length &&
      this.isVideo(imgPaths[currentImageIndex])
    ) {
      if (
        currentImageIndex === 0 &&
        this.firstMediaRef.current instanceof HTMLVideoElement
      ) {
        this.firstMediaRef.current.play().catch((err) => {
          console.log("Video autoplay prevented:", err);
        });
      } else {
        const videoRef = this.videoRefs.get(currentImageIndex);
        if (videoRef?.current) {
          videoRef.current.play().catch((err) => {
            console.log("Video autoplay prevented:", err);
          });
        }
      }
    }
  };

  private handleCardMouseEnter = () => {
    // Play the active video when hovering over the card
    this.playActiveVideo();
  };

  private handleCardMouseLeave = () => {
    // Pause all videos when mouse leaves the card
    if (this.firstMediaRef.current instanceof HTMLVideoElement) {
      this.firstMediaRef.current.pause();
      this.firstMediaRef.current.currentTime = 0;
    }

    this.videoRefs.forEach((ref) => {
      if (ref.current) {
        ref.current.pause();
        ref.current.currentTime = 0; // Reset to start
      }
    });
  };

  public componentDidMount() {
    // If the first media is already loaded, measure it after layout
    if (this.firstMediaRef.current) {
      const isImage = this.firstMediaRef.current instanceof HTMLImageElement;
      const isVideo = this.firstMediaRef.current instanceof HTMLVideoElement;

      if (
        isImage &&
        (this.firstMediaRef.current as HTMLImageElement).complete
      ) {
        this.measureFirstMedia();
      } else if (
        isVideo &&
        (this.firstMediaRef.current as HTMLVideoElement).readyState >= 2
      ) {
        this.measureFirstMedia();
      }
    }
  }

  public componentDidUpdate(
    prevProps: ProjectCardProps,
    prevState: ProjectCardState
  ) {
    // If the current image index changed, pause and reset videos that are no longer active
    if (prevState.currentImageIndex !== this.state.currentImageIndex) {
      const { imgPaths } = this.props.project;
      const { currentImageIndex } = this.state;

      // Pause and reset the previously active video if it was a video
      const prevIndex = prevState.currentImageIndex;
      if (
        prevIndex >= 0 &&
        prevIndex < imgPaths.length &&
        this.isVideo(imgPaths[prevIndex])
      ) {
        if (
          prevIndex === 0 &&
          this.firstMediaRef.current instanceof HTMLVideoElement
        ) {
          this.firstMediaRef.current.pause();
          this.firstMediaRef.current.currentTime = 0;
        } else {
          const prevVideoRef = this.videoRefs.get(prevIndex);
          if (prevVideoRef?.current) {
            prevVideoRef.current.pause();
            prevVideoRef.current.currentTime = 0;
          }
        }
      }

      // Play the newly active video if it's a video
      this.playActiveVideo();
    }
  }

  private measureFirstMedia() {
    requestAnimationFrame(() => {
      if (this.firstMediaRef.current) {
        const rect = this.firstMediaRef.current.getBoundingClientRect();
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

  public render() {
    const { project } = this.props;
    const { currentImageIndex } = this.state;
    const hasMultipleImages = project.imgPaths.length > 1;

    return (
      <a
        className="Project-Card"
        href={`/Blog?id=${project.id}`}
        ref={this.cardRef}
        onMouseEnter={this.handleCardMouseEnter}
        onMouseLeave={this.handleCardMouseLeave}
      >
        <div className="Project-Title"> {project.name}</div>
        <div className="Project-Date"> {project.date}</div>

        {project.inProgress ? this.inProgress() : ""}

        <div className="Project-Image-Container">
          {project.imgPaths.map((mediaPath, index) => {
            const offset = index - currentImageIndex;
            const isVisible = Math.abs(offset) <= 1;

            if (!isVisible) return null;

            const isActive = index === currentImageIndex;
            const isFirstMedia = index === 0;
            const { imageWidth, imageHeight } = this.state;
            const isVideoFile = this.isVideo(mediaPath);

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

            if (isVideoFile) {
              const videoRef = this.videoRefs.get(index);
              return (
                <video
                  key={index}
                  ref={
                    isFirstMedia
                      ? (this
                          .firstMediaRef as React.RefObject<HTMLVideoElement>)
                      : videoRef
                  }
                  src={`/assets/${mediaPath}`}
                  className={`Project-Image ${isActive ? "active" : ""} ${
                    offset !== 0 ? "behind" : ""
                  } ${hasSized ? "sized" : ""}`}
                  style={style}
                  muted
                  loop
                  playsInline
                  onLoadedMetadata={
                    isFirstMedia ? this.handleFirstMediaLoad : undefined
                  }
                />
              );
            } else {
              return (
                <img
                  key={index}
                  ref={
                    isFirstMedia
                      ? (this
                          .firstMediaRef as React.RefObject<HTMLImageElement>)
                      : undefined
                  }
                  src={`/assets/${mediaPath}`}
                  alt={`${project.name} - Image ${index + 1}`}
                  className={`Project-Image ${isActive ? "active" : ""} ${
                    offset !== 0 ? "behind" : ""
                  } ${hasSized ? "sized" : ""}`}
                  style={style}
                  onLoad={isFirstMedia ? this.handleFirstMediaLoad : undefined}
                />
              );
            }
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
