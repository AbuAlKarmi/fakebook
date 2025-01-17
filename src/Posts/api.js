import { generatePath } from 'react-router-dom';
import httpClient from '../httpClient';

export const fetch = async id => {
    try {
        const resp = await httpClient.get(generatePath(`/users/:id/posts`, { id }))
        return resp.data;
    } catch (e) {
        throw e;
    }
}

// is it good practice to retrieve the user id like so
// and returning it in the response to use it in setQueryData for the query key
// or is it better to pass it through when calling mutateAsync on form submission
export const createPost = async (post) => {
    try {
        const resp = await httpClient.post(`/posts`, post)
        return {
            data: resp.data,
            id: resp.data.userId,
        }
    } catch (e) {
        throw e;
    }
}
