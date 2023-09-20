import BeatsControl from './BeatsControl';
import BpmControl from './BpmControl';
import ControlButtons from './ControlButtons';

const Metronome = () => {

  const MetSound = [SnareSound];

  let startTime = 0;
  let tempoBpm = 60;
  const sound = new MetronomeSound('./', MetSound, {
      setTempo: (t: number) => tempoBpm = t,
      setStartTime: (s: number) => startTime = s
  })

  console.log(sound, startTime, tempoBpm)
  return (
    <>
      <div className="app-container">
        <div className="control-section">
          <BpmControl />
        </div>
        <div className="control-section">
          <ControlButtons sound={sound} />
        </div>
        <div className="control-section">
          <BeatsControl />
        </div>
      </div>
    </>
  );
};

export default Metronome;
