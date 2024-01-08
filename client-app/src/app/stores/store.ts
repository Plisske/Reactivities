import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import ModalStore from "./modalStore";
import AccountStore from "./accountStore";

interface Store {
    accountStore: AccountStore;
    activityStore: ActivityStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
}

export const store: Store = {
    accountStore: new AccountStore(),
    activityStore: new ActivityStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore()
}

export const StoreContext = createContext(store);

// Hook we're making use of in App.tsx
export function useStore() {
    //StoreContext contains the ActivityStore object
    return useContext(StoreContext);
}
