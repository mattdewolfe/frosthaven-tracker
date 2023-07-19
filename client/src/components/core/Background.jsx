import bonfire3 from '../../assets/bonfire3.gif';

export default function Background() {
    return (
        <img src={bonfire3} alt="a dark souls bonfire"
            className="Background"
            style={{ width: "100%", height: "100%", position: "absolute", zIndex: -1 }}>
        </img>
    );
}

