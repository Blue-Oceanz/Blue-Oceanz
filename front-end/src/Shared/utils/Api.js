import { getToken } from 'Shared/utils/token';

const Api = {};
const API_URL = process.env.REACT_APP_BASE_API_URL;

const request = (method, endpoint, body) => {
    const token = getToken();
    const opts = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
    if (body) opts.body = JSON.stringify(body);
    return fetch(API_URL + endpoint, opts).then((response) => response.json());
};
Api.users = {
    get: () => request('GET', '/users'),
    login: (email, password) =>
        request('POST', '/users/login', { email, password }),
};

Api.register = {
    register: (first, last, email, password, role) =>
         request('POST', '/users/register', {first, last, email, password, role}),
};

Api.opportunities = {
    getAllByGroup: (group) => request('GET', '/opportunities/' + group),
};

Api.applications = {
    getAll: () => request('GET', '/applications'),
    setStatus: (id, status) =>
        request('PATCH', '/applications/' + id, { status }),
    create: (body) => request('POST', '/applications', body),
    delete: (id) =>
        request('DELETE', '/applications/'+id),
};

Api.comments = {
    getAll: (id) => request('GET', '/comments/' + id)
}

Api.auth = {
    post: (body) => request('POST', '/users/'),
};

const applications = Api.applications;

export { applications };

export default Api;
