export default (params) => {
    const keys = Object.keys(params);
    let result = [];

    for (let entry of keys) {
        // We ignore these entries for our select WHERE line
        if (entry.indexOf('sort' || 'page' || 'limit')) {
            continue;
        }
        result.push(`${entry} = ${params[entry]}`);
    }

    return result;
};
