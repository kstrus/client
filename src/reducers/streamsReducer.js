import { CREATE_STREAM } from '../actions/types';

export default (state = [], action) => {
    switch (action.type) {
        case CREATE_STREAM:
            return [...state, {
                title: action.payload.title,
                description: action.payload.description,
                id: action.payload.id
            }];
        default:
            return state;
    }
};
