import { useEffect } from 'react';
import { useRive } from 'rive-react';
import "./clubs-component.css"

interface ClubsRiveAnimationProps {
  active: boolean;
}

const ClubsRiveAnimation: React.FC<ClubsRiveAnimationProps> = ({ active }) => {
  const { RiveComponent, rive } = useRive({
    src: "/animations/clubs_new.riv",
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
      <RiveComponent className='clubs-animation' />
  );
};

export default ClubsRiveAnimation;