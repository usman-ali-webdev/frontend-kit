import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3001',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        // Content-Type is set automatically for POST requests with axios
    }
});

const getPosts = () => {
    return apiClient.get('/posts');
};

const createPost = (postData) => {
    return apiClient.post('/posts', postData);
};

const editPost = (id, postData) => {
    return apiClient.put(`/posts/${id}`, postData);
}


const deletePost = (id) => {
    return apiClient.delete(`/posts/${id}`);
}



export default {
    getPosts,
    createPost,
    editPost,
    deletePost
};
