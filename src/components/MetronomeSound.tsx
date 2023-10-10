import { useEffect, useRef } from 'react';
import useMetronomeStore from '../store';

const MetronomeSound: React.FC = () => {
  const {
    isPlaying,
    setBPM,
    bpm,
    buffers,
    soundNum,
    setStartTime,
    nextStart,
    setNextStart,
    isLoaded
  } = useMetronomeStore();

  const audioContextRef = useRef<AudioContext>(new AudioContext());
  const currentSourceRef = useRef<AudioBufferSourceNode | null>(null);  // Ref to track the current source

  function stopPlaying(): void {
    setBPM(0);
    if (currentSourceRef.current) {
        currentSourceRef.current.stop();
        currentSourceRef.current.disconnect();
        currentSourceRef.current = null;
    }
  }

  function schedule(): void {
    if (!isPlaying) {
        stopPlaying();
        return;
    }

    if (!isLoaded) {
        alert('Sound files are still loading. Please wait.');
        return;
    }

    const currentContextTime = audioContextRef.current.currentTime;
    const startTime = nextStart ?? currentContextTime;

    setStartTime(startTime);
    setBPM(bpm);

    const bufIndex = soundNum - 1;

    if (bufIndex >= buffers.length) {
        alert('Sound files are not yet loaded');
    } else if (bpm) {
        const interval = 60 / bpm;
        const newNextStart = startTime + interval;
        
        if (isNaN(newNextStart) || !isFinite(newNextStart)) {
            console.error("Computed next start time is invalid:", newNextStart);
            return;
        }
        setNextStart(newNextStart);  // Update the state for future reference

        const newSource = audioContextRef.current.createBufferSource();
        const selectedBuffer: AudioBuffer = buffers[bufIndex];
        newSource.buffer = selectedBuffer;
        newSource.connect(audioContextRef.current.destination);
        newSource.onended = schedule;
        newSource.start(startTime);  // Use the local startTime variable
        currentSourceRef.current = newSource;  // Update the current source ref
    }
  }

  // Effect to start/stop the metronome based on isPlaying
  useEffect(() => {
      if (isPlaying) {
          schedule();
      } else {
          stopPlaying();
      }
  }, [isPlaying]);

  // Cleanup effect
  useEffect(() => {
      return () => {
          stopPlaying();
      };
  }, []);

  return null;
};

export default MetronomeSound;