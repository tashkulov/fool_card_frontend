import img from "../../../../img/titus-wrapper.svg"

type TTitleBackgroundSvg = {
    className: string,
    text: string
}

const TitleBackgroundSvg = (props: TTitleBackgroundSvg) => {
    const { className, text } = props


    return (
        <div className={className}>
            <h2>{text}</h2>
            <img src={img} alt=""/>
        </div>

    );
};

export default TitleBackgroundSvg;