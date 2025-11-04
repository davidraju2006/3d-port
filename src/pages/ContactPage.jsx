import React, { useEffect, useRef, useState } from 'react';
import ContactUs from '../components/ContactUs';
import SnowfallBackground from '../components/SnowfallBackground';
import CatModel from '../components/CatModel';
import meowAudio from '../Audio/meow.wav';

const ContactPage = () => {
  const audioRef = useRef(null);
  const timeoutRef = useRef(null);
  const [isMeowPaused, setIsMeowPaused] = useState(false);

  const playAudioWithGap = () => {
    if (audioRef.current && !isMeowPaused) {
      audioRef.current.volume = 1.0;
      audioRef.current.play().catch((e) => {
        console.error("Error playing meow.wav audio:", e);
      });
    }
  };

  const handleEnded = () => {
    timeoutRef.current = setTimeout(() => {
      playAudioWithGap();
    }, 2000);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('ended', handleEnded);
      playAudioWithGap();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleEnded);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isMeowPaused]);

  const pauseMeow = () => {
    setIsMeowPaused(true);
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const resumeMeow = () => {
    setIsMeowPaused(false);
  };

  return (
    <>
      <SnowfallBackground />
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '40px',
        position: 'relative',
        backgroundColor: 'transparent',
        overflow: 'hidden',
        gap: '40px',
      }}>
        <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '400px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '30px', color: '#915eff' }}>Contact Us</h1>
          <ContactUs />
        </div>
        <div style={{ flex: 1, minWidth: '300px', maxWidth: '600px' }}>
          <CatModel pauseMeow={pauseMeow} resumeMeow={resumeMeow} />
        </div>
      </div>
      <audio
        ref={audioRef}
        src={meowAudio}
        preload="auto"
        style={{ display: 'none' }}
      />
    </>
  );
};

export default ContactPage;
