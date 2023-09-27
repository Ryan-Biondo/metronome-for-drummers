import BeatsControl from './BeatsControl';
import BpmControl from './BpmControl';
import ControlButtons from './ControlButtons';
// import MetronomeSound from './MetronomeSound';
// import SnareSound from './audio/snare-drum-808-3.wav'
import useMetronomeStore from '../store';

const Metronome = () => {
  const {buffers} = useMetronomeStore();
  console.log(buffers)
  return (
    <>
      <div className="app-container">
        <div className="control-section">
          <BpmControl />
        </div>
        <div className="control-section">
          <ControlButtons />
        </div>
        <div className="control-section">
          <BeatsControl />
        </div>
      </div>
    </>
  );
};

export default Metronome;
