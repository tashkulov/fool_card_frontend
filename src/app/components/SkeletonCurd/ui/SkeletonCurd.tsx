import { FC, ReactNode } from 'react';
import cls from "./SkeletonCurd.module.scss";
import React from 'react';

interface SkeletonCurdProps {
    children?: ReactNode,
    background?: boolean
}

const SkeletonCurd: FC<SkeletonCurdProps> = ({ children, background }) => {

    return (
        <div className={background ? cls.noBg : cls.main} >
            {children}
        </div>
    );
};

export default SkeletonCurd;
