import cls from "./getReferralBonuses.module.scss"
import SkeletonCurd from "../../../../../components/SkeletonCurd/ui/SkeletonCurd";
import IconBonuses from "../../../../img/IconBonuses.svg"
import {useTranslation} from "react-i18next";
import React from "react";

type TGetReferralBonuses = {
    bonuses: string,

}

const GetReferralBonuses = (props: TGetReferralBonuses) => {
    const {t} = useTranslation()
    const { bonuses } = props

    return (
        <SkeletonCurd>
            <div className={cls.main}>
                {bonuses
                    ?
                    <>
                        <div className={cls.bonuses}>
                            <img src={IconBonuses} alt=""/>
                            <span>{bonuses}</span>
                        </div>
                        <div className={cls.getBonuses}>
                            {t("забрать")}
                        </div>
                    </>
                    :
                    <div className={cls.loading}>
                        {t("Высчитывание...")}
                    </div>
                }

            </div>
        </SkeletonCurd>
    );
};

export default GetReferralBonuses;