import { useEffect } from 'react';
import { useRive } from 'rive-react';
import "./diamonds-component.css"

interface DiamondsRiveAnimationProps {
  active: boolean;
}

const DiamondsRiveAnimation: React.FC<DiamondsRiveAnimationProps> = ({ active }) => {
  const { RiveComponent, rive } = useRive({
    src: "/animations/diamond.riv",
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
      <RiveComponent className='diamonds-animation' />
  );
};

export default DiamondsRiveAnimation;