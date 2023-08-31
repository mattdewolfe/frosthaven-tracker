import { convertObjectToHTTPQueryTerms } from '../utils/Conversion';
import useRestUtils from './useRestUtils';

function useDamageApi() {
    const { getRequest, postRequest, callbackWrapper } = useRestUtils();

    function getAllDamageDealt(callback, queryParams) {
        const query = `/damage/dealt${convertObjectToHTTPQueryTerms(queryParams)}`;
        callbackWrapper(getRequest(query), callback);
    }

    function getAllDamageTaken(callback, queryParams) {
        const query = `/damage/taken${convertObjectToHTTPQueryTerms(queryParams)}`;
        callbackWrapper(getRequest(query), callback);
    }

    function postDamageDealt(callback, data) {
        callbackWrapper(postRequest('/damage/dealt', data), callback);
    }

    function postDamageTaken(callback, data) {
        callbackWrapper(postRequest('/damage/taken', data), callback);
    }


    return {
        getAllDamageDealt,
        getAllDamageTaken,
        postDamageDealt,
        postDamageTaken
    };
}

export default useDamageApi;
