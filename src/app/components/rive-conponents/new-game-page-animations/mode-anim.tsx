// import { useEffect } from 'react';
import { useRive } from 'rive-react';
import "./mode-anim.css"
import { useEffect } from 'react';

interface ModeRiveAnimationProps {
    path: string;
    active: boolean;
}

const ModeRiveAnimation: React.FC<ModeRiveAnimationProps> = ({ path, active }) => {
    const { RiveComponent, rive } = useRive({
        src: `/animations/${path}.riv`,
        autoplay: true,
    });


    useEffect(() => {
        if (active) {
            rive?.play('active');
        } else {
            rive?.reset();
        }
    }, [rive, active]);

    return (
        <RiveComponent className='mode-animation' />
    );
};

export default ModeRiveAnimation;