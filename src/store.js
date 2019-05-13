import { createStore } from 'redux';
import rootReducer from  './reducers';

const initialState = {
    library: {
        searchQuery: ''
    }
};

export const store = createStore(
    rootReducer,
    initialState
);