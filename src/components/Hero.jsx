import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import style from "./style.js";
import ModelCanvas from "./canvas/ModelCanvas";
import herobg from "../assets/herobg.png";
import fghAudio from "../Audio/fgh.opus";

const Hero = () => {
  const fghAudioRef = useRef(null);
  const [hasPlayed, setHasPlayed] = useState(false);




  const handleModelClick = () => {
    console.log("Hero.jsx: Model clicked, attempting to play audio");
    if (!hasPlayed && fghAudioRef.current) {
      fghAudioRef.current.volume = 1.0;
      fghAudioRef.current
        .play()
        .then(() => console.log("Audio started"))
        .catch((e) => console.error("Error playing fgh.opus audio:", e));
      setHasPlayed(true);
    }
  };

  return (
    <section
      className="relative w-full h-screen mx-auto"
      style={{
        backgroundImage: `url(${herobg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <ModelCanvas
        onModelClick={handleModelClick}
        animationName="walking"
      />

      {/* Hero Text + Dropdown */}
      <div
        className={`${style.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915eff]" />

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className={`${style.heroHeadText}`}>
              Hello👋, I'm{" "}
              <span className="text-[#E0F56AFF]">DAVID RAJU K S</span>
            </h1>
            <p className={`${style.heroSubText} mt-2 text-white-100`}>
              On a{" "}
              <span className="text-[#CC3DDCFF]">Mission</span>{" "}
              to <span className="text-[#FA915CFF]">make a</span>
              <span className="text-[#84E021FF]"> positive impact</span>
            </p>


          </motion.div>
        </div>
      </div>

      {/* Hidden audio element */}
      <audio
        ref={fghAudioRef}
        src={fghAudio}
        preload="auto"
        style={{ display: "none" }}
      />
    </section>
  );
};

export default Hero;
