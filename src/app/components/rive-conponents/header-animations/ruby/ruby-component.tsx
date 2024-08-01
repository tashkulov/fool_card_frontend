import "./ruby-component.css"
import { useRive} from "@rive-app/react-canvas";

export const RiveDemo = () => {
  const { RiveComponent } = useRive({
    src: "/animations/ruby.riv",
    autoplay: true,
  });
  return <RiveComponent className="ruby-animation" />;
};

const MyRiveAnimation = () => {
  return (
      <RiveDemo />   
  );
};

export default MyRiveAnimation;