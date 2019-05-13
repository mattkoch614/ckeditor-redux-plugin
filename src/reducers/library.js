const initialState = {
    searchQuery: ''
}

export default(state = initialState, payload) => {
    switch (payload.type) {
        case 'search':
            return Object.assign({}, state, {
                searchQuery: payload.searchQuery
            });
        default:
            return state;
    }
};