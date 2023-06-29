import React from 'react';
import useIsMounted from './useIsMounted';

// This hook is for use with reducers, in order to ensure that dispatch calls
// are only happening on a mounted component (primarily useful with async or callback methods)
// Use:
// To setup in your component, simply pass in the dispatch method of your reducer.
// Then call dispatchAction anywhere you would have called dispatch, passing along
// the action type and value as you would normally.
// Matt D, Mar16/'23
const useMountedDispatch = (dispatch) => {

    const isMounted = useIsMounted();

    const dispatchAction = (type, value) => {
        if (isMounted()) {
            dispatch?.({ type, value });
        }
    }

    return dispatchAction;
}

export default useMountedDispatch;