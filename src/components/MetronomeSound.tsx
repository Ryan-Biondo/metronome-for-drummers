import { useEffect, useRef } from 'react';
import useMetronomeStore from '../store'; // Assuming this is the correct import path for your store

interface MetronomeSoundProps {
    isPlaying: boolean;
}

const MetronomeSound: React.FC<MetronomeSoundProps> =  ({ isPlaying }) => {
    const audioContextRef = useRef(new AudioContext());
    const currentSourceRef = useRef<AudioNode | null>(null); // Updated type to AudioNode
    const { bpm, buffers, soundNum } = useMetronomeStore();
    
    const interval = 60 / bpm;

    function playSound() {

        if (currentSourceRef.current) {
            currentSourceRef.current.disconnect();
          }
        
          const bufIndex = soundNum - 1;
          if (bufIndex >= buffers.length) {
            alert('Sound files are not yet loaded');
            return;
          }
        
          const newSource = audioContextRef.current.createBufferSource();
          newSource.buffer = buffers[bufIndex];
          newSource.connect(audioContextRef.current.destination);
          newSource.start();
          currentSourceRef.current = newSource;
    }

    useEffect(() => {
        if(isPlaying){
            const metronome = setInterval(playSound, interval * 1000);
            return () => clearInterval(metronome);
        }
    }, [bpm, isPlaying]);

    return null;
};

export default MetronomeSound