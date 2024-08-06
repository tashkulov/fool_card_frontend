export const calculateCardStyles = (index: number, total: number) => {
    const angle = (index - (total - 1) / 2) * 15;
    const xOffset = (index - (total - 1) / 2) * 30;
    return {
        transform: `rotate(${angle}deg) translateX(${xOffset}px)`
    };
};
export const calculateCardStylesForOpponent = (index: number, total: number) => {
    const angle = (index - (total - 1) / 2) * -15;
    const xOffset = (index - (total - 1) / 2) * 40;
    return {
        transform: `rotate(${angle}deg) translateX(${xOffset}px)`
    };
};
