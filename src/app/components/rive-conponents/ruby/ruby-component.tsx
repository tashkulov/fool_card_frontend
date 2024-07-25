import RiveComponent from 'rive-react';
import "./ruby-component.css"

const MyRiveAnimation = () => {
  return (
      <RiveComponent className='ruby-animation' src="/animations/ruby.riv" />
  );
};

export default MyRiveAnimation;