import {ReactNode} from "react";
import cls from "./SkeletPage.module.scss"
import Footer from "../../../components/Footer/Footer";
import imgLeftSvgIcons from "../../../pages/img/Frame_Left.svg"
import imgRightSvgIcons from "../../../pages/img/Frame_Right.svg"
import Header from "../../../pages/Widgets/Header/ui/Header";

type TSkeletonPage = {
    textHeader: string,
    children?: ReactNode;
}

const SkeletonPage = (props: TSkeletonPage) => {
    const { textHeader, children } = props

    return (
        <div className={cls.main}>
            <Header text={textHeader}/>
            <img className={cls.leftSolid} src={imgLeftSvgIcons} alt=""/>
            <img className={cls.rightSolid} src={imgRightSvgIcons} alt=""/>
            <div className={cls.mainContent}>
                {children}
            </div>
            <Footer/>
        </div>
    )
}

export default SkeletonPage;