import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import TestErrors from "../../features/errors/TestError";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import LoginForm from "../../features/users/LoginForm";
import AccountDashboard from "../../features/accounts/dashboard/AccountDashboard";
import AccountForm from "../../features/accounts/form/AccountForm";
import AccountWithdraw from "../../features/accounts/form/AccountWithdraw";
import AccountDeposit from "../../features/accounts/form/AccountDeposit";
import AccountDetails from "../../features/accounts/details/AccountDetails";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            { path: 'accounts', element: <AccountDashboard /> },
            { path: 'accounts/:id', element: <AccountDetails /> },
            { path: 'createAccount', element: <AccountForm key='create' /> },
            { path: 'manageaccount/:id', element: <AccountForm key='manage' /> },
            { path: 'deposit/:id', element: <AccountDeposit /> },
            { path: 'withdraw/:id', element: <AccountWithdraw /> },
            { path: 'activities', element: <ActivityDashboard /> },
            { path: 'activities/:id', element: <ActivityDetails />},
            { path: 'createActivity', element: <ActivityForm key='create' />},
            { path: 'manage/:id', element: <ActivityForm key='manage' /> },
            { path: 'login', element: <LoginForm />},
            { path: 'errors', element: <TestErrors />},
            { path: 'not-found', element: <NotFound /> },
            { path: 'server-error', element: <ServerError /> },
            //Anywhere that is not on the routes page will redirect to notfound
            { path: '*', element: <Navigate replace to='/not-found'/> },

        ]
    }
]

export const router = createBrowserRouter(routes);