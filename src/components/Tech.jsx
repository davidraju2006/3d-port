import React, { useState, useRef } from "react";
import { SectionWrapper } from "../hoc"; // Ensure correct import path
import { technologies } from "./constants/technologies";
import reactLogo from "../assets/tech/reactjs.png"; // Import the transparent React logo
import BallCanvas from "./canvas/Ball";
import ErrorBoundary from "./ErrorBoundary";
import javaVideo from "../Audio/java.mp4";
import htmlVideo from "../Audio/html.mp4";
import cssVideo from "../Audio/css.mp4";
import jsVideo from "../Audio/java script.mp4";
import reactVideo from "../Audio/react js.mp4";
import threeVideo from "../Audio/three js.mp4";
import gitVideo from "../Audio/git.mp4";
import gitHubVideo from "../Audio/git hub.mp4";
import blenderVideo from "../Audio/blender.mp4";
import figmaVideo from "../Audio/figma.mp4";
import cAudio from "../Audio/c aud.opus";
import pyAudio from "../Audio/py aud.opus";
import nodeAudio from "../Audio/node.opus";
import filmoraAudio from "../Audio/filmora.opus";
import vsdcAudio from "../Audio/vsdc.opus";

const Tech = () => {
  const [hoveredTech, setHoveredTech] = useState(null);
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const htmlVideoRef = useRef(null);
  const htmlAudioRef = useRef(null);
  const cssVideoRef = useRef(null);
  const cssAudioRef = useRef(null);
  const jsVideoRef = useRef(null);
  const jsAudioRef = useRef(null);
  const reactVideoRef = useRef(null);
  const reactAudioRef = useRef(null);
  const threeVideoRef = useRef(null);
  const threeAudioRef = useRef(null);
  const gitVideoRef = useRef(null);
  const gitAudioRef = useRef(null);
  const gitHubVideoRef = useRef(null);
  const gitHubAudioRef = useRef(null);
  const blenderVideoRef = useRef(null);
  const blenderAudioRef = useRef(null);
  const figmaVideoRef = useRef(null);
  const figmaAudioRef = useRef(null);
  const cAudioRef = useRef(null);
  const pyAudioRef = useRef(null);
  const nodeAudioRef = useRef(null);
  const filmoraAudioRef = useRef(null);
  const vsdcAudioRef = useRef(null);

  const handleMouseEnter = (techName) => {
    setHoveredTech(techName);
    if (techName === "Java" && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch((error) => {
        console.error("Error playing video:", error);
      });
    }
    if (techName === "HTML" && htmlVideoRef.current) {
      htmlVideoRef.current.load();
      htmlVideoRef.current.play().catch((error) => {
        console.error("Error playing HTML video:", error);
      });
    }
    if (techName === "CSS" && cssVideoRef.current) {
      cssVideoRef.current.load();
      cssVideoRef.current.play().catch((error) => {
        console.error("Error playing CSS video:", error);
      });
    }
    if (techName === "JavaScript" && jsVideoRef.current) {
      jsVideoRef.current.load();
      jsVideoRef.current.play().catch((error) => {
        console.error("Error playing JavaScript video:", error);
      });
    }
    if (techName === "React" && reactVideoRef.current) {
      reactVideoRef.current.load();
      reactVideoRef.current.play().catch((error) => {
        console.error("Error playing React video:", error);
      });
    }
    if (techName === "ThreeJS" && threeVideoRef.current) {
      threeVideoRef.current.load();
      threeVideoRef.current.play().catch((error) => {
        console.error("Error playing ThreeJS video:", error);
      });
    }
    if (techName === "Git" && gitVideoRef.current) {
      gitVideoRef.current.load();
      gitVideoRef.current.play().catch((error) => {
        console.error("Error playing Git video:", error);
      });
    }
    if (techName === "GitHub" && gitHubVideoRef.current) {
      gitHubVideoRef.current.load();
      gitHubVideoRef.current.play().catch((error) => {
        console.error("Error playing GitHub video:", error);
      });
    }
    if (techName === "Blender" && blenderVideoRef.current) {
      blenderVideoRef.current.load();
      blenderVideoRef.current.play().catch((error) => {
        console.error("Error playing Blender video:", error);
      });
    }
    if (techName === "Figma" && figmaVideoRef.current) {
      figmaVideoRef.current.load();
      figmaVideoRef.current.play().catch((error) => {
        console.error("Error playing Figma video:", error);
      });
    }
  };

  const handleMouseLeave = (techName) => {
    if (techName === "Java" && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    if (techName === "HTML" && htmlVideoRef.current) {
      htmlVideoRef.current.pause();
      htmlVideoRef.current.currentTime = 0;
    }
    if (techName === "CSS" && cssVideoRef.current) {
      cssVideoRef.current.pause();
      cssVideoRef.current.currentTime = 0;
    }
    if (techName === "JavaScript" && jsVideoRef.current) {
      jsVideoRef.current.pause();
      jsVideoRef.current.currentTime = 0;
    }
    if (techName === "React" && reactVideoRef.current) {
      reactVideoRef.current.pause();
      reactVideoRef.current.currentTime = 0;
    }
    if (techName === "ThreeJS" && threeVideoRef.current) {
      threeVideoRef.current.pause();
      threeVideoRef.current.currentTime = 0;
    }
    if (techName === "Git" && gitVideoRef.current) {
      gitVideoRef.current.pause();
      gitVideoRef.current.currentTime = 0;
    }
    if (techName === "GitHub" && gitHubVideoRef.current) {
      gitHubVideoRef.current.pause();
      gitHubVideoRef.current.currentTime = 0;
    }
    if (techName === "Blender" && blenderVideoRef.current) {
      blenderVideoRef.current.pause();
      blenderVideoRef.current.currentTime = 0;
    }
    if (techName === "Figma" && figmaVideoRef.current) {
      figmaVideoRef.current.pause();
      figmaVideoRef.current.currentTime = 0;
    }
    setHoveredTech(null);
  };

  const handleClick = (techName) => {
    if (techName === "Java" && audioRef.current) {
      audioRef.current.load();
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    }
    if (techName === "HTML" && htmlAudioRef.current) {
      htmlAudioRef.current.load();
      htmlAudioRef.current.play().catch((error) => {
        console.error("Error playing HTML audio:", error);
      });
    }
    if (techName === "CSS" && cssAudioRef.current) {
      cssAudioRef.current.load();
      cssAudioRef.current.play().catch((error) => {
        console.error("Error playing CSS audio:", error);
      });
    }
    if (techName === "JavaScript" && jsAudioRef.current) {
      jsAudioRef.current.load();
      jsAudioRef.current.play().catch((error) => {
        console.error("Error playing JavaScript audio:", error);
      });
    }
    if (techName === "React" && reactAudioRef.current) {
      reactAudioRef.current.load();
      reactAudioRef.current.play().catch((error) => {
        console.error("Error playing React audio:", error);
      });
    }
    if (techName === "ThreeJS" && threeAudioRef.current) {
      threeAudioRef.current.load();
      threeAudioRef.current.play().catch((error) => {
        console.error("Error playing ThreeJS audio:", error);
      });
    }
    if (techName === "Git" && gitAudioRef.current) {
      gitAudioRef.current.load();
      gitAudioRef.current.play().catch((error) => {
        console.error("Error playing Git audio:", error);
      });
    }
    if (techName === "GitHub" && gitHubAudioRef.current) {
      gitHubAudioRef.current.load();
      gitHubAudioRef.current.play().catch((error) => {
        console.error("Error playing GitHub audio:", error);
      });
    }
    if (techName === "Blender" && blenderAudioRef.current) {
      blenderAudioRef.current.load();
      blenderAudioRef.current.play().catch((error) => {
        console.error("Error playing Blender audio:", error);
      });
    }
    if (techName === "Figma" && figmaAudioRef.current) {
      figmaAudioRef.current.load();
      figmaAudioRef.current.play().catch((error) => {
        console.error("Error playing Figma audio:", error);
      });
    }
    if (techName === "C" && cAudioRef.current) {
      cAudioRef.current.load();
      cAudioRef.current.play().catch((error) => {
        console.error("Error playing C audio:", error);
      });
    }
    if (techName === "Python" && pyAudioRef.current) {
      pyAudioRef.current.load();
      pyAudioRef.current.play().catch((error) => {
        console.error("Error playing Python audio:", error);
      });
    }
    if (techName === "Node" && nodeAudioRef.current) {
      nodeAudioRef.current.load();
      nodeAudioRef.current.play().catch((error) => {
        console.error("Error playing Node audio:", error);
      });
    }

    if (techName === "Filmora" && filmoraAudioRef.current) {
      filmoraAudioRef.current.load();
      filmoraAudioRef.current.play().catch((error) => {
        console.error("Error playing Filmora audio:", error);
      });
    }
    if (techName === "VSDC" && vsdcAudioRef.current) {
      vsdcAudioRef.current.load();
      vsdcAudioRef.current.play().catch((error) => {
        console.error("Error playing VSDC audio:", error);
      });
    }
  };

  return (
    <div className="flex flex-row flex-wrap justify-center gap-10">
      {technologies.map((tech) => (
        <div
          className="w-28 h-28 relative"
          key={tech.name}
          onMouseEnter={() => handleMouseEnter(tech.name)}
          onMouseLeave={() => handleMouseLeave(tech.name)}
          onClick={() => handleClick(tech.name)}
        >
          <ErrorBoundary>
            <BallCanvas icon={tech.name === "React" ? reactLogo : tech.icon} isHovered={hoveredTech === tech.name} />
          </ErrorBoundary>
          {tech.name === "Java" && hoveredTech === "Java" && (
            <video
              ref={videoRef}
              src={javaVideo}
              className="absolute top-0 left-0 w-full h-full object-contain rounded-lg pointer-events-none"
              muted
              preload="auto"
              loop
            />
          )}
          {tech.name === "Java" && (
            <audio
              ref={audioRef}
              src={javaVideo}
              style={{ display: "none" }}
              preload="auto"
            />
          )}
          {tech.name === "HTML" && hoveredTech === "HTML" && (
            <video
              ref={htmlVideoRef}
              src={htmlVideo}
              className="absolute top-0 left-0 w-full h-full object-contain rounded-lg pointer-events-none"
              muted
              preload="auto"
              loop
            />
          )}
          {tech.name === "HTML" && (
            <audio
              ref={htmlAudioRef}
              src={htmlVideo}
              style={{ display: "none" }}
              preload="auto"
            />
          )}
          {tech.name === "CSS" && hoveredTech === "CSS" && (
            <video
              ref={cssVideoRef}
              src={cssVideo}
              className="absolute top-0 left-0 w-full h-full object-contain rounded-lg pointer-events-none"
              muted
              preload="auto"
              loop
            />
          )}
          {tech.name === "CSS" && (
            <audio
              ref={cssAudioRef}
              src={cssVideo}
              style={{ display: "none" }}
              preload="auto"
            />
          )}
          {tech.name === "JavaScript" && hoveredTech === "JavaScript" && (
            <video
              ref={jsVideoRef}
              src={jsVideo}
              className="absolute top-0 left-0 w-full h-full object-contain rounded-lg pointer-events-none"
              muted
              preload="auto"
              loop
            />
          )}
          {tech.name === "JavaScript" && (
            <audio
              ref={jsAudioRef}
              src={jsVideo}
              style={{ display: "none" }}
              preload="auto"
            />
          )}
          {tech.name === "React" && hoveredTech === "React" && (
            <video
              ref={reactVideoRef}
              src={reactVideo}
              className="absolute top-0 left-0 w-full h-full object-contain rounded-lg pointer-events-none"
              muted
              preload="auto"
              loop
            />
          )}
          {tech.name === "React" && (
            <audio
              ref={reactAudioRef}
              src={reactVideo}
              style={{ display: "none" }}
              preload="auto"
            />
          )}
          {tech.name === "ThreeJS" && hoveredTech === "ThreeJS" && (
            <video
              ref={threeVideoRef}
              src={threeVideo}
              className="absolute top-0 left-0 w-full h-full object-contain rounded-lg pointer-events-none"
              muted
              preload="auto"
              loop
            />
          )}
          {tech.name === "ThreeJS" && (
            <audio
              ref={threeAudioRef}
              src={threeVideo}
              style={{ display: "none" }}
              preload="auto"
            />
          )}
          {tech.name === "Git" && hoveredTech === "Git" && (
            <video
              ref={gitVideoRef}
              src={gitVideo}
              className="absolute top-0 left-0 w-full h-full object-contain rounded-lg pointer-events-none"
              muted
              preload="auto"
              loop
            />
          )}
          {tech.name === "Git" && (
            <audio
              ref={gitAudioRef}
              src={gitVideo}
              style={{ display: "none" }}
              preload="auto"
            />
          )}
          {tech.name === "GitHub" && hoveredTech === "GitHub" && (
            <video
              ref={gitHubVideoRef}
              src={gitHubVideo}
              className="absolute top-0 left-0 w-full h-full object-contain rounded-lg pointer-events-none"
              muted
              preload="auto"
              loop
            />
          )}
          {tech.name === "GitHub" && (
            <audio
              ref={gitHubAudioRef}
              src={gitHubVideo}
              style={{ display: "none" }}
              preload="auto"
            />
          )}
          {tech.name === "Blender" && hoveredTech === "Blender" && (
            <video
              ref={blenderVideoRef}
              src={blenderVideo}
              className="absolute top-0 left-0 w-full h-full object-contain rounded-lg pointer-events-none"
              muted
              preload="auto"
              loop
            />
          )}
          {tech.name === "Blender" && (
            <audio
              ref={blenderAudioRef}
              src={blenderVideo}
              style={{ display: "none" }}
              preload="auto"
            />
          )}
          {tech.name === "Figma" && hoveredTech === "Figma" && (
            <video
              ref={figmaVideoRef}
              src={figmaVideo}
              className="absolute top-0 left-0 w-full h-full object-contain rounded-lg pointer-events-none"
              muted
              preload="auto"
              loop
            />
          )}
          {tech.name === "Figma" && (
            <audio
              ref={figmaAudioRef}
              src={figmaVideo}
              style={{ display: "none" }}
              preload="auto"
            />
          )}
          {tech.name === "C" && (
            <audio
              ref={cAudioRef}
              src={cAudio}
              style={{ display: "none" }}
              preload="auto"
            />
          )}
          {tech.name === "Python" && (
            <audio
              ref={pyAudioRef}
              src={pyAudio}
              style={{ display: "none" }}
              preload="auto"
            />
          )}
          {tech.name === "Node" && (
            <audio
              ref={nodeAudioRef}
              src={nodeAudio}
              style={{ display: "none" }}
              preload="auto"
            />
          )}

          {tech.name === "Filmora" && (
            <audio
              ref={filmoraAudioRef}
              src={filmoraAudio}
              style={{ display: "none" }}
              preload="auto"
            />
          )}
          {tech.name === "VSDC" && (
            <audio
              ref={vsdcAudioRef}
              src={vsdcAudio}
              style={{ display: "none" }}
              preload="auto"
            />
          )}
        </div>
      ))}
    </div>
  );
};

// Call the HOC correctly
export default SectionWrapper(Tech, "tech");
