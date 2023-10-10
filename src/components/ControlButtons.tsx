import useMetronomeStore from '../store';
import { BsStopFill, BsPlayFill } from 'react-icons/bs';
import MetronomeSound from './MetronomeSound';

const ControlButtons = () => {
    const { isPlaying, togglePlay, AudioLoader, setBuffers, urls } = useMetronomeStore();

    const loadAndPlay = () => {
        if (!isPlaying) {
            AudioLoader(setBuffers, urls)
                .then(() => togglePlay())
                .catch((err) => {
                    console.error("Error loading audio:", err);
                    alert("There was an error loading the audio files.");
                });
        } else {
            togglePlay();
        }
    };

    return (
        <>
            <button onClick={loadAndPlay}>
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
            <MetronomeSound isPlaying={isPlaying} />
        </>
    );
};

export default ControlButtons;