import useMetronomeStore from '../store';

const BpmDisplay = () => {
  const { bpm } = useMetronomeStore();
  return <div>{bpm} BPM</div>;
};

export default BpmDisplay;
