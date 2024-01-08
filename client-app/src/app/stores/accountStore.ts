import { makeAutoObservable, runInAction } from "mobx";
import { Account } from "../models/account";
import agent from "../api/agent";
import { v4 as uuid } from 'uuid';
import { format } from "date-fns";

//where we store all of our "stores"
//Simplest way to explain a "store" is this is 
// where we put all of our methods relating to the object
export default class AccountStore {
    accountRegistry = new Map<string, Account>();
    selectedAccount: Account | undefined = undefined; //Currently selected account
    editMode = false;
    //for loading indicator, page will always need to load first.
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get accountsByDate() {
        return Array.from(this.accountRegistry.values()).sort((a, b) =>
            a.date!.getTime() - b.date!.getTime());
    }

    get groupedAccounts() {
        return Object.entries(
            this.accountsByDate.reduce((accounts, account) => {
                const date = format(account.date!, 'dd MMM yyyy');
                //Checks if we have a match for an activity by date, if true then spread accounts and add accounts onto callback function
                // if not, create new array with that activity.
                accounts[date] = accounts[date] ? [...accounts[date], account] : [account];
                return accounts
            }, {} as { [key: string]: Account[] }) // parameters, starting objects.
        )
    }

    loadAccounts = async () => {
        this.setLoadingInitial(true);
        try {
            {/*set types to highest level, "Account[]" to allow for type inference, reduce code clutter, and adding type safety.*/ }
            const account = await agent.Accounts.list();
            account.forEach(account => {
                this.setAccount(account);
            })
            this.setLoadingInitial(false);

        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadAccount = async (id: string) => {
        //tries to get account from memory.
        // eslint-disable-next-line prefer-const
        let account = this.getAccount(id);
        if (account) {
            this.selectedAccount = account
            return account;
        }
        //if account is not in memory(refreshed page) then ...
        else {
            this.setLoadingInitial(true);
            try {
                account = await agent.Accounts.details(id);
                this.setAccount(account);
                runInAction(() => this.selectedAccount = account);
                this.setLoadingInitial(false);
                return account
            } catch (error) {
                console.log(error)
                this.setLoadingInitial(false);
            }
        }
    }

    
    private setAccount = (account: Account) => {
        account.date = new Date(account.date!);
        this.accountRegistry.set(account.id, account);
    }

    //gets the account from memory.
    private getAccount = (id: string) => {
        return this.accountRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createAccount = async (account: Account) => {
        this.loading = true;
        account.id = uuid();
        try {
            await agent.Accounts.create(account);
            runInAction(() => {
                this.accountRegistry.set(account.id, account);
                this.selectedAccount = account;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateAccount = async (account: Account) => {
        this.loading = true;
        try {
            await agent.Accounts.update(account);
            runInAction(() => {
                this.accountRegistry.set(account.id, account);
                this.selectedAccount = account;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    depositAccount = async (account: Account) => {
        this.loading = true;
        try {
            await agent.Accounts.update(account);
            runInAction(() => {
                this.accountRegistry.set(account.id, account);
                this.selectedAccount = account;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    withdrawAccount = async (account: Account) => {
        this.loading = true;
        try {
            await agent.Accounts.update(account);
            runInAction(() => {
                this.accountRegistry.set(account.id, account);
                this.selectedAccount = account;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteAccount = async (id: string) => {
        this.loading = true;
        try {
            await agent.Accounts.delete(id);
            runInAction(() => {
                this.accountRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false;
            })
        }
    }

}