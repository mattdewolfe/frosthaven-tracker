import useRestUtils from "./useRestUtils";
import { MockPlayers } from "./mockData";

function usePlayersApi() {
    const { getRequest, postRequest, callbackWrapper } = useRestUtils();

    function getAllPlayers(callback) {
        // These end points do not exist, so instead we will fake the response with mock data.
        callback?.(null, MockPlayers);

        //callbackWrapper(getRequest("/players"), callback);
    }

    function getPlayerById(id, callback) {
        callbackWrapper(getRequest(`/players?id=${id}`), callback);
    }

    function postNewPlayer(data, callback) {
        callbackWrapper(postRequest("/players", data), callback);
    }

    return {
        getAllPlayers,
        getPlayerById,
        postNewPlayer
    };
}

export default usePlayersApi;
