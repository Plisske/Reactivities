import { Fragment, useEffect, useState } from 'react'
import axios from 'axios';
import {  Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';


function App() {
    {/*[component, function] all useState() hooks are independent states from eachother.*/ }
    const [activities, setActivities] = useState<Activity[]>([]);
    // used to pass information from a component to the app
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
    const [editMode, setEditMode] = useState(false);

    {/*accepts functions, needs dependencies*/}
    useEffect(() => {
        {/*set types to highest level, "Activity[]" to allow for type inference, reduce code clutter, and adding type safety.*/ }
        axios.get<Activity[]>('http://localhost:5000/api/activities/')
            .then(response => {
                console.log(response);
                setActivities(response.data)
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

    function handleCreateOrEditActivity(activity: Activity){
        activity.id ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
            : setActivities([...activities, {...activity, id:uuid()}]);
        setEditMode(false);
        setSelectedActivity(activity);
    }

    function handleDeleteActivity(id: string) {
        setActivities([...activities.filter(x =>x.id !== id)])
    }


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
                />
            </Container>
            
            
        </Fragment>
  )
}

export default App
