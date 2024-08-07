export const getCardImagePath = (card: string | undefined| null ) => {
    if (card){
        const [suit] = card.split('_');
        const path = new URL(`../../../../../../../assets/cards/${suit}/${card}.svg`, import.meta.url).href;
        return path;
    }else{
        console.log('иди в пизду ')
    }

};