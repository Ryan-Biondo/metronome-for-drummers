import BpmDisplay from './BpmDisplay';
import BpmSlider from './BpmSlider';
import BpmInput from './BpmInput';

const BpmControl = () => {
  return (
    <>
      <div className="control-section">
        <BpmDisplay />
      </div>
      <div className="control-section">
        <BpmSlider />
      </div>
      <div className="control-section">
        <BpmInput />
      </div>
    </>
  );
};

export default BpmControl;
