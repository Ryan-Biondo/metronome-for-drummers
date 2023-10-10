import useMetronomeStore from '../store';
import { BsStopFill, BsPlayFill } from 'react-icons/bs';
import MetronomeSound from './MetronomeSound';

// interface ControlButtonsProps {
//   sound: MetronomeSound
// }

const ControlButtons = () => {
  const { isPlaying, togglePlay, setIsLoaded, AudioLoader, setBuffers, urls } = useMetronomeStore();

  const toggleLoader = async () => {
    try {
      const areFilesLoaded = await AudioLoader(setBuffers, urls, setIsLoaded);
      if (areFilesLoaded) {
        togglePlay();
      } else {
        console.error("Audio files failed to load.");
      }
    } catch (error) {
      console.error("An error occurred while loading the audio files:", error);
    }
  };

  return (
    <>
      <button onClick={toggleLoader}>
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