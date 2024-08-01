
import "./hearts-component.css";
import { useEffect } from 'react';
import { useRive } from 'rive-react';
// Определите интерфейс для пропсов
interface HeartsRiveAnimationProps {
  active: boolean;
}

const HeartsRiveAnimation: React.FC<HeartsRiveAnimationProps> = ({ active }) => {
  const { RiveComponent, rive } = useRive({
    src: "/animations/hearts.riv",
    autoplay: true,
  });

  useEffect(() => {
    if (active) {
      rive?.play('active');
    } else {
      
      rive?.reset()
    }
  }, [active, rive]);

  return <RiveComponent className='hearts-animation' />;
};

export default HeartsRiveAnimation;