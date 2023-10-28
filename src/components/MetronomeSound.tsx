import React, { useEffect } from 'react';
import useMetronomeStore from '../store';
import SubdivisionSound from './SubdivisionSound';

interface MetronomeSoundProps {
  isPlaying: boolean;
}

const MetronomeSound: React.FC<MetronomeSoundProps> = ({ isPlaying }) => {
  const { bpm, buffers, audioContext, shouldDelay, setShouldDelay } =
    useMetronomeStore();

  useEffect(() => {
    if (isPlaying) {
      setShouldDelay(true);
      const delayTimer = setTimeout(() => {
        setShouldDelay(false);
      }, 300);
      return () => clearTimeout(delayTimer);
    }
  }, [bpm]);

  useEffect(() => {
    let timer: number;
    if (isPlaying && !shouldDelay) {
      const playMainBeat = () => {
        if (buffers[0]) {
          const newSource = audioContext.createBufferSource();
          newSource.buffer = buffers[0];
          newSource.connect(audioContext.destination);
          newSource.start();
        }
      };

      playMainBeat();
      timer = window.setInterval(playMainBeat, 60000 / bpm);

      return () => {
        clearInterval(timer);
      };
    }
  }, [bpm, isPlaying, shouldDelay]);

  return (
    <>
      {isPlaying && (
        <SubdivisionSound isPlaying={isPlaying} audioContext={audioContext} />
      )}
    </>
  );
};

export default MetronomeSound;
