import axios, { AxiosError, AxiosResponse } from 'axios';
import { Activity } from '../models/activity';
import { Account } from '../models/account';
import { toast } from 'react-toastify';
import { router } from '../router/Routes';
import { store } from '../stores/store';
import { User, UserFormValues } from '../models/user';

//this file is used to centralize axios data obtaining, calls, and types.

//intentional delay timer
const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

//where we get our data from our api
axios.defaults.baseURL = 'http://localhost:5000/api';

//passes our token upstream
axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    //if our token is available from local storage or wherever
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`
    return config;
})

//an intentional delay for our localhost website
axios.interceptors.response.use(
    async response => {
      await sleep(1000);
      return response;
    },
    (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if (config.method === 'get' && Object.prototype.hasOwnProperty.call(data.errors, 'id')) {
                router.navigate('/not-found')
            }
            if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            } else {
                toast.error(data);
            }
            break;
        case 401:
            toast.error('unauthorized')
            break;
        case 403:
            console.log(status)
            toast.error('forbidden')
            break;
        case 404:
            router.navigate('/not-found')
            break;
        case 500:
            store.commonStore.setServerError(data);
            router.navigate('/server-error');
            break;
    }
    return Promise.reject(error); //pass the error back to the component which called the error
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: object) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: object) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const Activities = {
    list: () => requests.get<Activity[]>('/activities'),
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (activity: Activity) => requests.post<void>('/activities', activity),
    update: (activity: Activity) => requests.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => axios.delete<void>(`/activities/${id}`)
}

const Profile = {
    current: () => requests.get<User>('/profile'), //returns a user object from the request. Returns a promise with a user object
    login: (user: UserFormValues) => requests.post<User>('/profile/login', user),
    register: (user: UserFormValues) => requests.post<User>('/profile/register', user)
}

const Accounts = {
    list: () => requests.get<Account[]>('/accounts'),
    details: (id: string) => requests.get<Account>(`/accounts/${id}`),
    create: (account: Account) => requests.post<void>('/accounts', account),
    update: (account: Account) => requests.put<void>(`/accounts/${account.id}`, account),
    delete: (id:string) => axios.delete<void>(`/accounts/${id}`)

}

const agent = {
    Activities,
    Profile,
    Accounts
}

export default agent;