export const calculateCardStyles = (index: number, total: number) => {
    const angle = (index - (total - 1) / 2) * 15;
    const xOffset = (index - (total - 1) / 2) * 30;
    return {
        transform: `rotate(${angle}deg) translateX(${xOffset}px)`
    };
};

export const getMyRotateStyle = (index: number, total: number) => {
    return (index - (total - 1) / 2) * 15;
}

export const getMyTranslateXStyle = (index: number, total: number) => {
    return (index - (total - 1) / 2) * 30;
}

export const getRotateStyle = (index: number, total: number) => {
    return (index - (total - 1) / 2) * -15;
}

export const getTranslateXStyle = (index: number, total: number) => {
    return (index - (total - 1) / 2) * 40;
}

export const getTranslateYStyle = (index: number) => {
    return index % 2 === 0 ? 150 : -150;
}


export const calculateCardStylesForOpponent = (index: number, total: number) => {
    const angle = (index - (total - 1) / 2) * -15;
    const xOffset = (index - (total - 1) / 2) * 40;
    return {
        transform: `rotate(${angle}deg) translateX(${xOffset}px)`
    };
};
