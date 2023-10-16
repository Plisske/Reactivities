import { Fragment, useEffect, useState } from 'react'
import {  Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';


function App() {
    {/*[component, function] all useState() hooks are independent states from eachother.*/ }
    const [activities, setActivities] = useState<Activity[]>([]);
    // used to pass information to indicate a specified activity
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
    const [editMode, setEditMode] = useState(false);
    //for loading indicator, page will always need to load first.
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);


    {/*accepts functions, needs dependencies*/}
    useEffect(() => {
        {/*set types to highest level, "Activity[]" to allow for type inference, reduce code clutter, and adding type safety.*/ }
        agent.Activities.list().then(response => {
            // eslint-disable-next-line prefer-const
            let activities: Activity[] = [];
            response.forEach(activity => {
                activity.date = activity.date.split('T')[0];
                activities.push(activity);
            })
            setActivities(activities);
            setLoading(false);
            })
        {/*dependencies go below in brackets*/ }
    }, [])

    function handleSelectActivity(id: string) {
        //x represents an activity.
        setSelectedActivity(activities.find(x => x.id === id));
    }

    //when no activity is selected or you cancel viewing an activity, the activity is no longer 
    function handleCancelSelectActivity() {
        setSelectedActivity(undefined);
    }

    function handleFormOpen(id?: string) {
        id ? handleSelectActivity(id) : handleCancelSelectActivity();
        setEditMode(true);
    }

    function handleFormClose() {
        setEditMode(false);
    }

    function handleCreateOrEditActivity(activity: Activity) {
        setSubmitting(true);
        if (activity.id) {
            agent.Activities.update(activity).then(() => {
                setActivities([...activities.filter(x => x.id !== activity.id), activity])
                setSelectedActivity(activity);
                setEditMode(false);
                setSubmitting(false);
            })
        } else {
            activity.id = uuid();
            agent.Activities.create(activity).then(() => {
                setActivities([...activities, activity ]);
                setSelectedActivity(activity);
                setEditMode(false);
                setSubmitting(false);
            })
        }
    }

    function handleDeleteActivity(id: string) {
        setSubmitting(true);
        agent.Activities.delete(id).then(() => {
            setActivities([...activities.filter(x => x.id !== id)])
            setSubmitting(false);
        })
        
    }

    if (loading) return <LoadingComponent content='Loading app' />


    {/*can only return 1 element*/ }
    return (
        <Fragment>
            <NavBar openForm={handleFormOpen} />
            <Container style={{ marginTop: '7em' }}>
                {/*Add the component and functions for another file here 
                    and pass the required info "activities" through object assignment*/}
                {/*The class is aquired from the useState() function in this case.*/}
                <ActivityDashboard
                    activities={activities}
                    selectedActivity={selectedActivity}
                    selectActivity={handleSelectActivity}
                    cancelSelectActivity={handleCancelSelectActivity}
                    editMode={editMode}
                    openForm={handleFormOpen}
                    closeForm={handleFormClose}
                    createOrEdit={handleCreateOrEditActivity}
                    deleteActivity={handleDeleteActivity}
                    submitting={submitting}
                />
            </Container>
            
            
        </Fragment>
  )
}

export default App
