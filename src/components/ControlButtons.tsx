import useMetronomeStore from '../store';
import { BsStopFill, BsPlayFill } from 'react-icons/bs';
import AudioLoader from './AudioLoader';
import MetronomeSound from './MetronomeSound';
// import {useEffect} from 'react'
// import MetronomeSound from './MetronomeSound';

// interface ControlButtonsProps {
//   sound: MetronomeSound
// }

const ControlButtons = () => {
  const {  isPlaying, setBPM, bpm, buffers, setBuffers, urls } = useMetronomeStore();

  const TriggerAudio = () => {
   MetronomeSound();
  }


  return (
    <button onClick={TriggerAudio}>
      {isPlaying ? (
        <>
          <BsStopFill /> Stop
        </>
      ) : (
        <>
          <BsPlayFill /> Play
        </>
      )}
    </button>
  );
};

export default ControlButtons;
