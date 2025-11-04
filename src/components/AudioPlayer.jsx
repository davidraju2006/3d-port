import React, { useEffect, useRef } from 'react';
import flySound from '../Audio/fly.wav';

const AudioPlayer = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.play().catch((e) => {
        console.log('Audio play prevented:', e);
      });
    }
  }, []);

  return <audio ref={audioRef} src={flySound} />;
};

export default AudioPlayer;
