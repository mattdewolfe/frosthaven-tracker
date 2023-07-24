import bonfire3 from '../../assets/bonfire3.gif';

export default function Background() {
    return (
        <img src={bonfire3} alt="a dark souls bonfire"
            style={{
                width: "100vw",
                height: "100vh",
                position: "fixed",
                top: 0,
                zIndex: -1
            }}>
        </img>
    );
}

