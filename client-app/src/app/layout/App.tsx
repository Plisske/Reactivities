import { Fragment, useEffect } from 'react'
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import 'semantic-ui-css/semantic.min.css'
import { ToastContainer } from 'react-toastify';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';


function App() {
    const location = useLocation();
    const { commonStore, userStore } = useStore();

    useEffect(() => {
        if (commonStore.token) {
            userStore.getUser().finally(() => commonStore.setAppLoaded())
        } else {
            commonStore.setAppLoaded()
        }
    }, [commonStore, userStore])

    if (!commonStore.appLoaded) return <LoadingComponent content='Loading app...'/>

    {/*can only return 1 element*/ }
    return (
        <Fragment>
        <ModalContainer /> {/*adds functinoality to our homepage*/}
        <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
            {location.pathname === '/' ? <HomePage /> : (
                <Fragment>
                    <NavBar />
                    <Container style={{ marginTop: '7em' }}>
                        {/*The Outlet element from router-dom automatically picks up the routes from our Routes.tsx*/}
                        <Outlet />
                    </Container>
                </Fragment>
            ) }
        </Fragment>
  )
}

export default observer(App);
//MobX classes cant use HMR reloads (updating code doesn't refresh the page). Refreshes upon updating code.
