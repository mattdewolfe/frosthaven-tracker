import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const baseStyle = Object.freeze({
    width: '100%',
    display: 'flex',
    marginTop: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'transparent',
    overflow: 'hidden'
});

const LoadingWrapper = ({ loading, color = 'lightblue', children, style }) => {
    if (loading) {
        return (
            <div style={{ ...baseStyle, ...style }}>
                <Spinner
                    style={{ color: color }}
                    animation="border"
                    role="status" />
            </div>
        );
    }
    else {
        return (
            <>
                {children}
            </>
        );
    }
}

export default LoadingWrapper;