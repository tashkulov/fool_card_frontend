import cls from "./Header.module.scss"
import HeaderMainSvgIcon from "./SvgIcons/HeaderMainSvgIcon";
import TitleBackgroundSvg from "./SvgIcons/TitleBackgroundSvg";
import HeaderRiveAnimation from "../../../../components/rive-conponents/header-animations/ruby-header/ruby-component";

type THeader = {
    text: string;
}

const Header = (props: THeader) => {
    const { text } = props


    return (
        <header className={cls.main}>
            <div className="header-svg-part">
                <HeaderRiveAnimation />
                <HeaderMainSvgIcon />
            </div>

            <TitleBackgroundSvg text={text} className={cls.titleBackgroundSvg} />

        </header>
    );
};

export default Header;