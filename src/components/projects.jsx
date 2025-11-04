import React, { useRef, useState, useEffect } from 'react';
import PhoenixBirdModel from './PhoenixBirdModel';
import flySound from '../Audio/fly.wav';
import './projects.css';

const Projects = () => {
  const descriptionRef = useRef(null);
  const [birdOffset, setBirdOffset] = useState(0);

  useEffect(() => {
    const descriptionElement = descriptionRef.current;
    if (!descriptionElement) return;

    const handleScroll = () => {
      const scrollTop = descriptionElement.scrollTop || 0;
      const offset = Math.min(scrollTop, 200);
      setBirdOffset(offset);
    };

    descriptionElement.addEventListener('scroll', handleScroll);

    return () => {
      descriptionElement.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <audio src={flySound} autoPlay loop />
      <div
        id="container3D"
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1000,
          transform: `translateX(-${birdOffset}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        <PhoenixBirdModel />
      </div>
      <section className="section" id="banner">
        <div className="content-fit">
          <div className="title" data-before="PROJECTS">MY AMAZING</div>
        </div>
      </section>

      <section className="section" id="intro">
        <div className="content-fit flex items-center gap-1">
          <div className="des">
            <div className="number align-top">01</div>
            <div className="title">Logo Designer</div>
            <p>MVP is your creative companion for transforming text into stunning visuals. </p>
            <p> Whether you're generating logo ideas,concept art, or unique illustrations, </p> 
            <p> MVP harnesses AI to convert simple prompts into powerful designs.Say goodbye</p>
            <p>to generic imagery—create personalized graphics in seconds, perfect for branding,</p>
             presentations, and social media.I am the logo designer of the app.
          </div>
        </div>
      </section>

      <section className="section justify-end" id="description" ref={descriptionRef}>
        <div className="content-fit flex justify-right">
          <div className="number">02</div>
          <div className="des">
            <div className="title">Horror Game</div>
            <p>
              I am the level designer of Echoes of Hell, a horror game rooted in the culture and landscapes of Tamil Nadu, 
              I focus on creating immersive, tension-filled environments. Drawing inspiration from local myths, deserted Buildings, 
              and ancient temples,I design each level to evoke fear through atmosphere
              and level cors, making every area feel alive with unease and mystery. Also 3D model created for the game.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="contact">
        <div className="content-fit flex justify-start">
          <div className="number">03</div>
          <div className="des">
            <div className="title">Bus track App</div>
            <p>
              The Bus Track App is designed to streamline college transportation by offering real-time tracking,
            </p>
            <p>
              route information, and arrival estimates to student. And managing the candidates for develop and debug the App.
            </p>
            <p>
              As part of the system, students and staffs can view live bus locations,
            </p>
            <p>
              receive stop alerts and access route details.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="contact2">
        <div className="content-fit flex justify-end">
          <div className="number">04</div>
          <div className="des">
            <div className="title">Food App</div>
            <p>This Food App connects customers and delivery agents for a seamless food ordering experience.</p>
            <p>Customers can browse menus, place orders, and track deliveries in real time.</p>
            <p>Delivery partners receive orders instantly and navigate optimized routes to ensure quick service.</p>
            <p>If an order gets canceled, the system intelligently reduces the price and redistributes the food</p>
            <p>to nearby users at a discounted rate, minimizing waste and ensuring efficient resource use.</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
