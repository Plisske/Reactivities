import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import 'react-calendar/dist/Calendar.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import './app/layout/styles.css';
import { StoreContext, store } from './app/stores/store';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router/Routes';


ReactDOM.render(
    <React.StrictMode>
        <StoreContext.Provider value={store}>
            <RouterProvider router={router} />
        </StoreContext.Provider>
    </React.StrictMode>,
    document.getElementById('root')
)
