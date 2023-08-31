/*
  This hook provides basic information regarding the platform the user is on, based on the userAgent string.
  Exported values:
  Platforms: const object, found below, mapping out the platforms we detect
  currentPlatform: object containing one bool value for each string in the platforms object

  Usage: simply import the { currentPlatform } object and then access the boolean you need to check.

  if (currentPlatform.ios) ? "You are on IOS!";

  MattD Oct 31/'22
*/
import { useMemo } from 'react';

const Platforms = Object.freeze({
    ANDROID: "android",
    IOS: "ios",
    OTHER: "other"
});

// Used to check the userAgent string and determine, if possible, Android or iOS platform.
const usePlatformDetection = () => {

    const currentPlatform = useMemo(() => {
        const agent = navigator.userAgent.toLowerCase();
        let results = { [Platforms.ANDROID]: false, [Platforms.IOS]: false, [Platforms.OTHER]: false };

        if (agent.match(/android/i)) {
            results[Platforms.ANDROID] = true;
            return results;
        }
        else if (agent.match(/iphone/i)) {
            results[Platforms.IOS] = true;
            return results;
        }

        results[Platforms.OTHER] = true;
        return results;
    }, [navigator.userAgent]);

    return { currentPlatform, Platforms };
}

export default usePlatformDetection;