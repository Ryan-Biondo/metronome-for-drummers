import useMetronomeStore from '../store';
import { BsStopFill, BsPlayFill } from 'react-icons/bs';

const ControlButtons = () => {
  const { isPlaying, togglePlay } = useMetronomeStore();
  return (
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
  );
};

export default ControlButtons;
