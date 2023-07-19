import React from "react";

const apiHost = "http://localhost:3002/";

const HostedImage = ({ src, style }) => {
    let trueSrc = "";

    if (src) {
        if (src.indexOf("/") < 1) {
            trueSrc = src.slice(1);
        }
        else trueSrc = src;
    }

    return <img src={apiHost + trueSrc} style={style} />
}

export default HostedImage;