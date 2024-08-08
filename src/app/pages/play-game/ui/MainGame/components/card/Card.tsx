import React from "react";
import styled, { keyframes } from "styled-components";

interface ICardProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    Rotate: number;
    Transform: number;
    Top?: number;
}
const cardMovement = (Rotate: number, Transform: number) => keyframes`
    0% {
        top: 50%;
        left: -17px;
        transform: rotate(200deg) translateY(-50%);
    }

    100% {
        top: calc(5%);
        left: 50%;
        transform-origin: bottom center;
        transform: translateX(${Transform - 50}%) rotate(${Rotate}deg);
    }
`;

const Img = styled.img<ICardProps>`
    width: 75px;
    height: auto;
    position: absolute;
    top: ${(props) => props.Top || "50%"};
    left: -30px;
    transform: translateY(-50%) rotate(200deg);
    animation: ${(props) => cardMovement(props.Rotate, props.Transform)} 1000ms forwards;
`;

const Card: React.FC<ICardProps> = (props) => {
    const { Rotate, Transform, Top, ...restProps } = props;

    return <Img Rotate={Rotate} Transform={Transform} Top={Top} {...restProps} />;
};

export default React.memo(Card);
