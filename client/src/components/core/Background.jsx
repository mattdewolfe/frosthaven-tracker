import bgImage from '../../assets/bb_hunters_workshop_compressed.jpeg';

export default function Background() {
    return (
        <img src={bgImage} alt="A hunter and his tools"
            style={{
                width: "100vw",
                height: "100vh",
                position: "fixed",
                top: 0,
                zIndex: -1,
                objectFit: 'cover'
            }}>
        </img>
    );
}

