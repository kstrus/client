import streams from '../apis/streams';
import history from '../history';
import {
    SIGN_IN,
    SIGN_OUT,
    CREATE_STREAM,
    DELETE_STREAM,
    EDIT_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM
} from './types';

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: {
            userId: userId
        }
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

export const createStream = (formData) => {
    return (dispatch, getState) => {
        const { userId } = getState().auth;
        streams.post('/streams', { ...formData, userId: userId }).then((response) => {
            dispatch({
                type: CREATE_STREAM,
                payload: response.data
            });
            history.push('/');
        });
    };
};

export const fetchStream = (id) => {
    return (dispatch) => {
        streams.get(`/streams/${id}`).then((response) => {
            dispatch({
                type: FETCH_STREAM,
                payload: response.data
            });
        });
    };
};

export const fetchStreams = () => {
    return (dispatch) => {
        streams.get('/streams').then((response) => {
            dispatch({
                type: FETCH_STREAMS,
                payload: response.data
            });
        });
    };
};

export const editStream = (id, formData) => {
    return (dispatch) => {
        streams.patch(`/streams/${id}`, formData).then((response) => {
            dispatch({
                type: EDIT_STREAM,
                payload: response.data
            });
            history.push('/');
        });
    };
};

export const deleteStream = (id) => {
    return (dispatch) => {
        streams.delete(`/streams/${id}`).then(() => {
            dispatch({
                type: DELETE_STREAM,
                payload: {
                    id: id
                }
            });
            history.push('/');
        });
    };
};
