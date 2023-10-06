import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';


function App() {
    {/*[component, function]*/ }
    const [activities, setActivities] = useState([]);

    {/*accepts functions, needs dependencies*/}
    useEffect(() => {
        axios.get('http://localhost:5000/api/activities/')
            .then(response => {
                console.log(response);
                setActivities(response.data)
            })
        {/*dependencies go below in brackets*/ }
    }, [])

    {/*can only return 1 element*/ }
    return (
        <div>
            <Header as='h2' content='Reactivities' />
            <List>
            <ul>
                {activities.map((activity: any) => (
                    <List.Item key={activity.id}>
                        {activity.title}
                    </List.Item>
                ))}
            </ul>
            </List>
        </div>
  )
}

export default App
