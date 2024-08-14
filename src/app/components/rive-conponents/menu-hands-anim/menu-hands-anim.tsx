import "./menu-hands-anim.css"
import { useRive } from "@rive-app/react-canvas";

export const RiveDemo = () => {
    const { RiveComponent } = useRive({
        src: "/animations/hands.riv",
        autoplay: true,
    });
    return <RiveComponent className="menu-hands-anim" />;
};

const MenuHandsAnim = () => {
    return (
        <RiveDemo />
    );
};

export default MenuHandsAnim;