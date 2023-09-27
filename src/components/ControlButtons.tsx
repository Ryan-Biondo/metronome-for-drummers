import useMetronomeStore from '../store';
import { BsStopFill, BsPlayFill } from 'react-icons/bs';
import MetronomeSound from './MetronomeSound';
// import MetronomeSound from './MetronomeSound';
// import {useEffect} from 'react'
// import MetronomeSound from './MetronomeSound';

// interface ControlButtonsProps {
//   sound: MetronomeSound
// }

const ControlButtons = () => {
  const { isPlaying, togglePlay } = useMetronomeStore();

  return (
    <>
      <button onClick={togglePlay}>
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
      {isPlaying && <MetronomeSound />}
    </>
  );
};

export default ControlButtons