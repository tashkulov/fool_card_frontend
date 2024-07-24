import cls from "./Referrals.module.scss"
import SkeletonPage from "../../../components/SkeletonPage/ui/SkeletPage.tsx";
import GetReferralBonuses from "./getReferralBonuses/ui/getReferralBonuses.tsx";
import {useState} from "react";
import SkeletonCurd from "../../../components/SkeletonCurd/ui/SkeletonCurd.tsx";
import friendsIconSvg from "../../img/FriendsIconSvg.svg"
import {useTranslation} from "react-i18next";

const Referrals = () => {
    const [str, setStr] = useState("")
    const {t} = useTranslation()

    setTimeout(() => {
        setStr("1000")
    }, 1000)

    return (
        <SkeletonPage textHeader={t("Рефералы")}>
            <div className={cls.main}>
                <GetReferralBonuses bonuses={str}/>
                <p>
                    {t("Пользователь получает 10% от заработанного опыта приведённого реферала\n" +
                        "                    Единоразовое вознаграждение 1000 монет")}
                </p>
                <SkeletonCurd>
                    <div className={cls.friends}>
                        {t("Пригласить друга")}
                    </div>
                </SkeletonCurd>
                <div className={cls.countsFriends}>
                    {t("Друзей")} - 3
                </div>
                <div className={cls.friendsList}>
                    <SkeletonCurd background={true}>
                        <div className={cls.curdFriends}>
                            <div className={cls.wrapperImgWithName}>
                                <img src={friendsIconSvg} alt=""/>
                                <div>
                                    friend_1
                                </div>
                            </div>
                            <button>
                                1200 XP
                            </button>
                        </div>
                    </SkeletonCurd><SkeletonCurd background={true}>
                        <div className={cls.curdFriends}>
                            <div className={cls.wrapperImgWithName}>
                                <img src={friendsIconSvg} alt=""/>
                                <div>
                                    friend_1
                                </div>
                            </div>
                            <button>
                                1200 XP
                            </button>
                        </div>
                    </SkeletonCurd><SkeletonCurd background={true}>
                        <div className={cls.curdFriends}>
                            <div className={cls.wrapperImgWithName}>
                                <img src={friendsIconSvg} alt=""/>
                                <div>
                                    friend_1
                                </div>
                            </div>
                            <button>
                                1200 XP
                            </button>
                        </div>
                    </SkeletonCurd><SkeletonCurd background={true}>
                        <div className={cls.curdFriends}>
                            <div className={cls.wrapperImgWithName}>
                                <img src={friendsIconSvg} alt=""/>
                                <div>
                                    friend_1
                                </div>
                            </div>
                            <button>
                                1200 XP
                            </button>
                        </div>
                    </SkeletonCurd><SkeletonCurd background={true}>
                        <div className={cls.curdFriends}>
                            <div className={cls.wrapperImgWithName}>
                                <img src={friendsIconSvg} alt=""/>
                                <div>
                                    friend_1
                                </div>
                            </div>
                            <button>
                                1200 XP
                            </button>
                        </div>
                    </SkeletonCurd><SkeletonCurd background={true}>
                        <div className={cls.curdFriends}>
                            <div className={cls.wrapperImgWithName}>
                                <img src={friendsIconSvg} alt=""/>
                                <div>
                                    friend_1
                                </div>
                            </div>
                            <button>
                                1200 XP
                            </button>
                        </div>
                    </SkeletonCurd><SkeletonCurd background={true}>
                        <div className={cls.curdFriends}>
                            <div className={cls.wrapperImgWithName}>
                                <img src={friendsIconSvg} alt=""/>
                                <div>
                                    friend_1
                                </div>
                            </div>
                            <button>
                                1200 XP
                            </button>
                        </div>
                    </SkeletonCurd><SkeletonCurd background={true}>
                        <div className={cls.curdFriends}>
                            <div className={cls.wrapperImgWithName}>
                                <img src={friendsIconSvg} alt=""/>
                                <div>
                                    friend_1
                                </div>
                            </div>
                            <button>
                                1200 XP
                            </button>
                        </div>
                    </SkeletonCurd><SkeletonCurd background={true}>
                        <div className={cls.curdFriends}>
                            <div className={cls.wrapperImgWithName}>
                                <img src={friendsIconSvg} alt=""/>
                                <div>
                                    friend_1
                                </div>
                            </div>
                            <button>
                                1200 XP
                            </button>
                        </div>
                    </SkeletonCurd><SkeletonCurd background={true}>
                        <div className={cls.curdFriends}>
                            <div className={cls.wrapperImgWithName}>
                                <img src={friendsIconSvg} alt=""/>
                                <div>
                                    friend_1
                                </div>
                            </div>
                            <button>
                                1200 XP
                            </button>
                        </div>
                    </SkeletonCurd>
                </div>
            </div>
        </SkeletonPage>
    )
}

export default Referrals;