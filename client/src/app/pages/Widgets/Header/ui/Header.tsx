import cls from "./Header.module.scss"
import HeaderMainSvgIcon from "./SvgIcons/HeaderMainSvgIcon.tsx";
import TitleBackgroundSvg from "./SvgIcons/TitleBackgroundSvg.tsx";

type THeader = {
    text: string;
}

const Header = (props: THeader) => {
    const {text} = props


    return (
        <header className={cls.main}>
            <HeaderMainSvgIcon/>
            <TitleBackgroundSvg text={text} className={cls.titleBackgroundSvg}/>

        </header>
    );
};

export default Header;