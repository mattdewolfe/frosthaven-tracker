import React from 'react';
import { HostedImage } from "../core";

const SelectableEnumEntry = ({ data, onClick }) => {

    const handleClick = () => {
        onClick?.(data?.id);
    }

    return (
        <div
            className='clickable-container'
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 38,
                height: 38,
                padding: 2,
            }}
            onClick={handleClick}>
            <HostedImage src={data?.iconUrl} style={{ width: 32, height: 32, borderRadius: 6 }} />
        </div>
    );
}

export default SelectableEnumEntry;