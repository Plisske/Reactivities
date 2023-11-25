import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../models/serverError";

export default class CommonStore {
    error: ServerError | null = null;
    //JWT authentication token
    token: string | null | undefined = localStorage.getItem('jwt'); //local storage is the local storage of the browser
    appLoaded = false;

    constructor() {
        makeAutoObservable(this);

        //Will activate when we do something with our token (refresh page, change locations, w.e)
        reaction(
            () => this.token,
            token => {
                if (token) {
                    localStorage.setItem('jwt', token)
                } else {
                    localStorage.removeItem('jwt')
                }
            }
        )
    }

    setServerError(error: ServerError) {
        this.error = error;
    }

    setToken = (token: string | null) => {
        this.token = token;
    }

    setAppLoaded = () => {
        this.appLoaded = true;
    }

}