const removeTermination = (query) => `${query.replace(/(;$)/g, '')}`;

const addLimit = (query, limit, values) => {
    /* eslint-disable-next-line no-param-reassign */
    values.limit = limit;

    return `${removeTermination(query)} LIMIT $[limit];`;
};

const addOffset = (query, offset, values) => {
    /* eslint-disable-next-line no-param-reassign */
    values.offset = offset;

    return `${removeTermination(query)} OFFSET $[offset];`;
};

const getCountQuery = (query) => {
    return query.replace(/(?<=SELECT).*(?=FROM)/, ' COUNT(*) ')
                .replace(/(?=LEFT JOIN).*(?=(WHERE|\;))/, '');
};

// The programmatically created countQuery that this will build out often fails in complex cases,
// so now you can manually pass in the countQuery you want paginate to use. MD Dec 17/'21
export default (connection, method, query, values = {}, options = {}, manualCountQuery = null) => {
    const limit = parseInt(options.limit, 10);
    const page = parseInt(options.page, 10);
    const offset = (page - 1) * limit;

    let newQuery = addLimit(query, limit, values);
    newQuery = addOffset(newQuery, offset, values);

    return new Promise((resolve, reject) => {
        const countQuery = manualCountQuery ? manualCountQuery : getCountQuery(query);

        connection.one(countQuery).then(({ count }) => method(newQuery, values).then((results) => {

            const totalPages = Math.ceil(count / limit) || 1;
            const lastIndex = page * limit;
            const metadata = {};
            const response = {
                success: true,
                items: results,
                _metadata: metadata,
            };

            metadata.page = page;
            metadata.per_page = limit;
            metadata.page_count = totalPages;
            metadata.total_count = parseInt(count, 10);
            metadata.links = {
                first: { page: 1, limit },
                last: { page: totalPages > 0 ? totalPages : 1, limit },
            };

            if (lastIndex < count) {
                metadata.links.next = { page: page + 1, limit };
            }

            if (page > totalPages) {
                metadata.links.prev = { page: totalPages, limit };
            } else if (page > 1) {
                metadata.links.prev = { page: page - 1, limit };
            }

            return resolve(response);
        }).catch((err) => reject(err))).catch((err) => reject(err));
    });
};
