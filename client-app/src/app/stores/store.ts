import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";

interface Store {
    activityStore: ActivityStore
}

export const store: Store = {
    activityStore: new ActivityStore()
}

export const StoreContext = createContext(store);

// Hook we're making use of in App.tsx
export function useStore() {
    //StoreContext contains the ActivityStore object
    return useContext(StoreContext);
}
