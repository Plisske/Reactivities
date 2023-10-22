import { Fragment, useEffect } from 'react'
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';


function App() {
    //Destructuring the object because we're only interest in the ActivityStore at this stage
    const { activityStore } = useStore();

    {/*[component, function] all useState() hooks are independent states from eachother.*/ }
    // const [activities, setActivities] = useState<Activity[]>([]);
    // used to pass information to indicate a specified activity


    {/*accepts functions, needs dependencies*/}
    useEffect(() => {
        activityStore.loadActivities();
        {/*dependencies go below in brackets*/ }
    }, [])

    if (activityStore.loadingInitial) return <LoadingComponent content='Loading app' />


    {/*can only return 1 element*/ }
    return (
        <Fragment>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
                <ActivityDashboard />
            </Container>
            
            
        </Fragment>
  )
}

export default observer(App);
//MobX classes cant use HMR reloads (updating code doesn't refresh the page). Refreshes upon updaing code.
