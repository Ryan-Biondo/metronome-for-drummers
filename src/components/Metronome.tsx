import BeatsControl from './BeatsControl';
import BpmControl from './BpmControl';
import ControlButtons from './ControlButtons';

const Metronome = () => {
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
