const RouteMap = {
    HOME: "/",
    SCENARIOS: "/scenarios",
    PLAYERS: "/players",
    DEBUG: "/debug",
    EXAMPLE: "/example"
};

const DynamicRoutes = {
    SINGLE_SCENARIO: "/scenarios/:id",
    SINGLE_PLAYER: "/players/:id",
    SINGLE_CHARACTER: "/characters/:id"
};

const FormatDynamicRoute = (route, value) => {
    if (route.indexOf(":") === -1) {
        return route;
    }

    let slice = route.slice(0, route.indexOf(":"));

    return `${slice}${value}`;
};


export {
    RouteMap,
    DynamicRoutes,
    FormatDynamicRoute
}