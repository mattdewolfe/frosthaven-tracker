import { useEffect, useRef, useCallback } from 'react';

// Simple hook that can be used to check if a component is mounted before taking state actions.
const useIsMounted = () => {

    const mountedRef = useRef(false);

    useEffect(() => {
        mountedRef.current = true;

        return () => {
            mountedRef.current = false;
        }
    }, []);

    const isMounted = useCallback(() => mountedRef.current, []);

    return isMounted;
}

export default useIsMounted;