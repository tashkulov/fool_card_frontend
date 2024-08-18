import {store} from "../../play-game/ui/store"
import React from "react";
import cls from "./home-page-header.module.scss"
import leftTop from "./img/Vector (4).svg"
import bottomCenter from "./img/Vector (6).svg"
import Groupcoin from "./img/Groupcoin.svg"
import coin from "./img/Coin.svg"
import ava from "./img/Group 31 (1).svg"
import plusCesh from "./img/Vector (7).svg"


const HomePageHeader: React.FC = () => {
    const user = store.getState().user

    console.log(`https://t.me/i/userpic/320/${user.id}.jpg`)

    return (
        <div className={cls.main}>
            <img src={leftTop} className={cls.leftTop} alt=""/>
            <hr className={cls.top}/>
            <img src={bottomCenter} className={cls.bottomCenter} alt=""/>
            <hr className={cls.bottom}/>
            <div className={cls.boxContent}>
                <img src={ava} alt=""/>
                <div>No_Name</div>
                <div>
                    <img src={Groupcoin} alt=""/>
                    100K
                </div>
                <div>
                    <img src={coin} alt=""/>
                    152.5K
                    <img src={plusCesh} alt=""/>
                </div>
            </div>
        </div>
    )
}

export default HomePageHeader