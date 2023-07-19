import React from 'react';

const InputError = ({ error, style }) => {
    return (
        <div style={{ color: 'red', fontSize: 14, ...style }}>
            {error}
        </div>
    );
}

export default InputError;