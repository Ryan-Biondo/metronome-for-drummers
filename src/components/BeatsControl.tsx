import useMetronomeStore from '../store';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

const BeatsControl = () => {
  const { beatsPerMeasure, setBeats } = useMetronomeStore();

  const incrementBeats = () => {
    if (beatsPerMeasure < 16) {
      setBeats(beatsPerMeasure + 1);
    }
  };

  const decrementBeats = () => {
    if (beatsPerMeasure > 1) {
      setBeats(beatsPerMeasure - 1);
    }
  };

  return (
    <div className="beats-control">
      <button onClick={decrementBeats}>
        <AiOutlineMinus />
      </button>
      <div>{beatsPerMeasure}</div>
      <button onClick={incrementBeats}>
        <AiOutlinePlus />
      </button>
    </div>
  );
};

export default BeatsControl;
