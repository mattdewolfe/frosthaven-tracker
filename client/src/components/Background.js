import northwall from '../assets/northwall.jpg'
export default function Background() {
    return  <img src= {northwall} alt="game of thrones wall"
    className="Background"
    style={{ width: "100%", height: "100%", position: "absolute", zIndex: -1 }}>

</img>
}

   