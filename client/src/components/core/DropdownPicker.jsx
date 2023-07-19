import React, { useMemo } from 'react';

const StandardMappingFunc = (entry) => {
    const { id, name } = entry;

    return {
        value: id,
        display: name
    }
}

// Your mappingFunc, when overwritten, must return an object of type { display, value }.
// Otherwise shit will break.
const DropdownPicker = ({ value, onChange, options, style, label = null, mappingFunc = StandardMappingFunc }) => {

    // If an onChange function is not provided, you CANNOT set the value of the dropdown directly.
    const useValueSetter = useMemo(() => {
        return onChange && typeof onChange === 'func' && value !== undefined;
    }, [onChange, value]);

    const handlePickerChange = (e) => {
        if (e.target) {
            onChange?.(e.target.value)
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row', gap: 10, ...style }}>
            {
                label !== null ?
                    < div className='form-label'>
                        {label}
                    </div>
                    : null
            }

            {
                useValueSetter ?
                    <select
                        onChange={handlePickerChange}
                        value={value}>
                        {
                            options.map((e, idx) => {
                                const { display, value } = mappingFunc?.(e);
                                return <option key={`${display}_${idx}`} value={value}>{display}</option>
                            })
                        }
                    </select>
                    :
                    <select onChange={handlePickerChange}>
                        {
                            options.map((e, idx) => {
                                const { display, value } = mappingFunc?.(e);
                                return <option key={`${display}_${idx}`} value={value}>{display}</option>
                            })
                        }
                    </select>
            }
        </div >
    );
}

export default DropdownPicker;