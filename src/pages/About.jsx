import React from 'react';
import { Tilt } from 'react-tilt'; // Consider replacing with a maintained alternative in future
import { motion } from 'framer-motion';
import styles from '../styles.js';
import { services } from '../components/constants';
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc/index.js';

const ServiceCard = ({ index, title, icon }) => {
  return (
    <Tilt className="sm:w-[45%] w-full" options={{ max: 25, scale: 1, speed: 400 }}>

      <motion.div 
        variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
        className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
      >
        <div 
          className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
        >
          <img src={icon} alt={title} className="w-16 h-16 object-contain" />
          <h3 className="text-[20px] font-bold text-center mt-4">{title}</h3>
        </div>
      </motion.div>
    </Tilt>
  );
};

const About = () => {
  return (
    <>
     <motion.div variants={textVariant()}>
  <p className="text-[#41BBE0FF] mt-6 text-cyan-500 text-[50px] max-w-10xl leading-[60px]">
    Introduction
  </p>
  <h1 className="mt-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent text-[55px] max-w-8xl leading-[60px]">
    Overview
  </h1>
</motion.div>

<motion.p
  variants={fadeIn("", "", 0.1, 1)}
  className="mt-4 text-gray-200 text-[17px] max-w-3xl leading-[30px]"
>
  Hello! I am{" "}
  <span className="text-[#E0F56AFF] font-semibold">DAVID RAJU K S</span>.
  I have intern experience at{" "}
  <span className="text-[#5CC9FAFF] font-medium">Solution Graph</span> and
  currently work freelancing at{" "}
  <span className="text-[#12B147FF] font-medium">Shero Home Food</span> in
  <span className="text-[#F5E8F7FF] font-medium"> Data Entry</span>. Also, I am the{" "}
  <span className="text-[#FFD54FFF] font-medium">COO</span> at{" "}
  <span className="text-[#E8E1DDFF] font-semibold">GoldenZ Vision</span>.
  <br />
  I can speak multiple languages like{" "}
  <span className="text-[#34D399] font-medium">Telugu</span>,{" "}
  <span className="text-[#FBBF24] font-medium">Tamil</span>,{" "}
  <span className="text-[#60A5FA] font-medium">English</span>,{" "}
  <span className="text-[#FB7185] font-medium">Arabic (R/W)</span>
</motion.p>


      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={`${service.title}-${index}`} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
