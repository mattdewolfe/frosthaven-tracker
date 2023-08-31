/* eslint-disable no-underscore-dangle */
import url from 'url';

export default function paginateLinksHandler(req, collection) {
    if (!Object.hasOwnProperty.call(collection, '_metadata')) {
        return;
    }

    Object.keys(collection._metadata.links).forEach((link) => {
        /* eslint-disable-next-line no-param-reassign */
        collection._metadata.links[link] = url.format({
            protocol: req.protocol,
            host: req.get('host'),
            pathname: url.parse(req.originalUrl).pathname,
            query: { ...req.query, ...collection._metadata.links[link] },
        });
    });
}
