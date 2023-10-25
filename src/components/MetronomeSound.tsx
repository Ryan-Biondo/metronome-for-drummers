import { useEffect, useRef, useState } from 'react';
import useMetronomeStore from '../store'; // Assuming this is the correct import path for your store

interface MetronomeSoundProps {
    isPlaying: boolean;

}
const MetronomeSound: React.FC<MetronomeSoundProps> =  ({ isPlaying}) => {
    const audioContextRef = useRef(new AudioContext());
    const currentSourceRef = useRef<AudioNode | null>(null); // Updated type to AudioNode
    const { bpm, buffers, soundNum, currentBeat, setCurrentBeat, beatsPerMeasure, subdivision } = useMetronomeStore();
    
    const interval = 60 / (bpm * subdivision);
    const [localBeat, setLocalBeat] = useState(0); // Local state to keep track of the current beat



    function playSound() {

        if (currentSourceRef.current) {
            currentSourceRef.current.disconnect();
          }

    //       for(let i=1; i<= beatsPerMeasure; i++){
    //         console.log(i)
    // }

        
          let bufIndex = soundNum - 1;
          if (bufIndex >= buffers.length) {
            alert('Sound files are not yet loaded');
            return;
          }
          const newBeat = (localBeat % beatsPerMeasure) + 1;
          setLocalBeat(newBeat); // Update the local state, not the global state
          console.log('Current Beat:', newBeat);

          if(newBeat == 1) {
             bufIndex = soundNum - 1;
          } 
          else{
            bufIndex = soundNum;
          }

   

        
          const newSource = audioContextRef.current.createBufferSource();
          newSource.buffer = buffers[bufIndex];
          newSource.connect(audioContextRef.current.destination);
          newSource.start();
          currentSourceRef.current = newSource;

    }
    useEffect(() => {
        if (isPlaying) {
          setCurrentBeat(localBeat); // Update the global state when isPlaying changes
          const metronome = setInterval(playSound, interval * 1000);
          return () => clearInterval(metronome);
        }
      }, [bpm, isPlaying, localBeat, setCurrentBeat, subdivision]);
    
      return null;
    };

export default MetronomeSound