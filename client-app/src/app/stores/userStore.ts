import { makeAutoObservable, runInAction } from "mobx";
import { User, UserFormValues } from "../models/user";
import agent from "../api/agent";
import { store } from "./store";
import { router } from "../router/Routes";

export default class UserStore {
    user: User | null = null;

    constructor() {
        makeAutoObservable(this)
    }

    get isLoggedIn() {
        return !!this.user;
    }

    login = async (creds: UserFormValues) => {
        const user = await agent.Profile.login(creds);
        store.commonStore.setToken(user.token)
        //use running action here because its the next tick from login info
        runInAction(() => this.user = user);
        router.navigate('/activities');
        store.modalStore.closeModal();
    }

    logout = () => {
        store.commonStore.setToken(null);
        //redundant because of reaction code in commonStore
        //localStorage.removeItem('jwt');
        this.user = null;
        router.navigate('/');
    }

    register = async (creds: UserFormValues) => {
        const user = await agent.Profile.register(creds);
        store.commonStore.setToken(user.token)
        runInAction(() => this.user = user);
        router.navigate('/activities');
        store.modalStore.closeModal();
    }

    getUser = async () => {
        try {
            const user = await agent.Profile.current();
            runInAction(() => this.user = user)
        } catch (error) {
            console.log(error);
        }
    }



}