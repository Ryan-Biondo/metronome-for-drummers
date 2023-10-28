import React, { useEffect } from 'react';
import useMetronomeStore from '../store';

interface SubdivisionSoundProps {
  isPlaying: boolean;
  audioContext: AudioContext;
}

const SubdivisionSound: React.FC<SubdivisionSoundProps> = ({
  isPlaying,
  audioContext,
}) => {
  const {
    shouldDelay,
    bpm,
    buffers,
    setCurrentBeat,
    beatsPerMeasure,
    subdivision,
  } = useMetronomeStore();

  useEffect(() => {
    let timer: number;
    let nextSubdivision = 0;

    if (isPlaying && !shouldDelay) {
      const playSubdivisionSound = () => {
        if (buffers[1]) {
          const newSource = audioContext.createBufferSource();
          newSource.buffer = buffers[1];
          newSource.connect(audioContext.destination);
          newSource.start();
        }
      };

      timer = window.setInterval(() => {
        nextSubdivision++;
        const currentBeat =
          (Math.floor(nextSubdivision / subdivision) % beatsPerMeasure) + 1;
        setCurrentBeat(currentBeat);

        if (nextSubdivision % subdivision !== 0) {
          playSubdivisionSound();
        }

        if (nextSubdivision >= beatsPerMeasure * subdivision) {
          nextSubdivision = 0;
        }
      }, 60000 / bpm / subdivision);

      return () => {
        clearInterval(timer);
      };
    }
  }, [bpm, isPlaying, shouldDelay]);

  return null;
};

export default SubdivisionSound;
