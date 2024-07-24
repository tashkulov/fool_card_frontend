import RiveComponent from 'rive-react';
import "./ruby-component.css"
import React from 'react';

const MyRiveAnimation = () => {
  return (
      <RiveComponent className='ruby-animation' src="/ruby.riv" />
  );
};

export default MyRiveAnimation;