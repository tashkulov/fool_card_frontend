import cls from "./LeaderBoard.module.scss";
import {useEffect, useState} from "react";
import {ITypeLeaderBord} from "../typeLeaderBord/typeLeaderBord";
import {getLeaderBoard} from "../getLeaderBoard/getLeaderBoard";
import SkeletonCurd from "../../../components/SkeletonCurd/ui/SkeletonCurd";
import firstMesto from "../../img/1mest.svg";
import secondMesto from "../../img/2mest.svg";
import threeMesto from "../../img/3mest.svg";
import lidstart from "../../img/lidstar.svg";
import referalAva from "../../img/referal-ava.svg"
import {useTranslation} from "react-i18next";
import SkeletonPage from "../../../components/SkeletonPage/ui/SkeletPage.tsx";

const LeaderBoard = () => {
    const [leaderBoardList, setLeaderBoardList] = useState<ITypeLeaderBord[]>([]);
    const {t} = useTranslation()
    useEffect(() => {
        const fetchData = async () => {
            const response = await getLeaderBoard();
            if (response && response.data) {
                console.log(response)
                setLeaderBoardList(response.data);
                console.log(leaderBoardList)
            } else {
                const arr = [{
                    experience: 2000,
                    username: "Pain"
                }, {
                    experience: 1500,
                    username: "Arsen"
                }, {
                    experience: 900,
                    username: "test"
                }]
                setLeaderBoardList(arr)
                console.log("что не так с данными из getLeaderBoard", response);
            }
        };

        fetchData();
    }, []);

    const mapperLeaderCurd = (item: ITypeLeaderBord, id: number) => {
        if (id == 0) {
            return (
                <SkeletonCurd key={id}>
                    <div className={cls.MVPPlayer}>
                        <div className={cls.wrapperIdAndImgName}>
                            <h3>1</h3>
                            <div className={cls.wrapperImgWithName}>
                                <img src={referalAva} alt=""/>
                                <div>{item.username}</div>
                            </div>
                        </div>
                        <div className={cls.wrapperImgWithExperience}>
                            <img src={firstMesto} alt=""/>
                            <div>{item.experience}</div>
                        </div>
                    </div>
                </SkeletonCurd>
            )
        } else if (id == 1) {
            return (
                <SkeletonCurd key={id}>
                    <div className={cls.MVPPlayer}>
                        <div className={cls.wrapperIdAndImgName}>
                            <h3>2</h3>
                            <div className={cls.wrapperImgWithName}>
                                <img src={referalAva} alt=""/>
                                <div>{item.username}</div>
                            </div>
                        </div>
                        <div className={cls.wrapperImgWithExperience}>
                            <img src={secondMesto} alt=""/>
                            <div>{item.experience}</div>
                        </div>
                    </div>
                </SkeletonCurd>
            )
        } else if (id == 2) {
            return (
                <SkeletonCurd key={id}>
                    <div className={cls.MVPPlayer}>
                        <div className={cls.wrapperIdAndImgName}>
                            <h3>3</h3>
                            <div className={cls.wrapperImgWithName}>
                                <img src={referalAva} alt=""/>
                                <div>{item.username}</div>
                            </div>
                        </div>
                        <div className={cls.wrapperImgWithExperience}>
                            <img src={threeMesto} alt=""/>
                            <div>{item.experience}</div>
                        </div>
                    </div>
                </SkeletonCurd>
            )
        }
    }

    return (
        <SkeletonPage textHeader={t("Лидерборд")}>
            <div className={cls.main}>
                <div className={cls.listLeaderBoard}>
                    {leaderBoardList.map((item, id) => (
                        id <= 2
                            ?
                            mapperLeaderCurd(item, id)
                            :
                            <SkeletonCurd key={id}>
                                <div className={cls.MVPPlayer}>
                                    <div className={cls.wrapperIdAndImgName}>
                                        <h3>{id + 1}</h3>
                                        <div className={cls.wrapperImgWithName}>
                                            <img src={referalAva} alt=""/>
                                            <div>{item.username}</div>
                                        </div>
                                    </div>
                                    <div className={cls.wrapperImgWithExperience}>
                                        <img src={lidstart} alt=""/>
                                        <div>{item.experience}</div>
                                    </div>
                                </div>
                            </SkeletonCurd>
                    ))}
                </div>
            </div>
        </SkeletonPage>
    );
}

export default LeaderBoard;