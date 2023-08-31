import React from "react";

const pageStyle = Object.freeze({
    pageContainer: {
        width: "100%",
        margin: 10
    },
    pageWrapper: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
    }
});

const StandardPageWrapper = ({ style, containerStyle = {}, children }) => {

    return (
        <div style={{ ...ContainerStyle.pageWrapper, ...style }} >
            <div style={pageContainerStyle}>
                {children}
            </div>
        </div>
    );
};

export default StandardPageWrapper; 