import { get } from 'axios'

const getPostRequest = () => {
    return get('https://jsonplaceholder.typicode.com/posts');
}

export {
    getPostRequest
}