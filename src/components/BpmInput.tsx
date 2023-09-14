import React from 'react';
import useMetronomeStore from '../store';

const BpmInput = () => {
  const { bpm, setBPM } = useMetronomeStore();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBPM(Number(event.target.value));
  };

  return (
    <>
      <input
        type="number"
        min="40"
        max="240"
        value={bpm}
        onChange={handleChange}
      />
    </>
  );
};

export default BpmInput;
