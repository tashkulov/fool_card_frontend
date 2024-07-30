import { useEffect } from 'react';
import { useRive } from 'rive-react';
import "./spades-component.css"

interface SpadesRiveAnimationProps {
  active: boolean;
}

const SpadesRiveAnimation: React.FC<SpadesRiveAnimationProps> = ({ active }) => {
  const { RiveComponent, rive } = useRive({
    src: "/animations/spades.riv",
    autoplay: true,
  });

  useEffect(() => {
    if (active) {
      rive?.play('active');
    } else {
      rive?.reset()
    }
  }, [active, rive]);
  return (
      <RiveComponent className='spades-animation' />
  );
};

export default SpadesRiveAnimation;