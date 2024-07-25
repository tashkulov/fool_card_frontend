import RiveComponent from 'rive-react';
import "./hearts-component.css"

const HeartsRiveAnimation = () => {
  return (
      <RiveComponent className='hearts-animation' src="/animations/hearts.riv" />
  );
};

export default HeartsRiveAnimation;