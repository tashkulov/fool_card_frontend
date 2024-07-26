import cls from "./OpenGame.module.scss"
import exp from "../../../../../../assets/img/otkrytye-opit.svg";
import men from "../../../../../../assets/img/men.svg";
import card1 from "../../../../../../assets/img/card1.svg";
import card2 from "../../../../../../assets/img/card2.svg";
import card3 from "../../../../../../assets/img/card3.svg";

interface openGameProps {
    username: string;
    experience: number;
    currentMembers: number;
    maxMembers: number;
}

const OpenGame = (props: openGameProps) => {
    const { username, experience, currentMembers, maxMembers,  } = props

    return (
        <div className={cls.main}>
            <div className={cls.experience}>
                <img src={exp} alt=""/>
                <div className={cls.experienceValue}>
                    {experience}
                </div>
            </div>
            <div className={cls.userNameWithMembers}>
                <div className={cls.wrapper}>
                    <div className={cls.userName}>
                        {username}
                    </div>
                    <div className={cls.wrapperMembers}>
                        <div className={cls.membersCurent}>
                            {currentMembers}
                        </div>
                        /
                        <div className={cls.maxMembers}>
                            {maxMembers}
                        </div>
                        <img src={men} alt=""/>
                    </div>
                </div>
            </div>
            <div className={cls.rulesGame}>
                <div className={cls.rulesImgWrapper}>
                    <img src={card1} alt=""/>
                    <img src={card2} alt=""/>
                    <img src={card3} alt=""/>
                </div>
                <button>
                </button>

            </div>
        </div>
    );
};

export default OpenGame