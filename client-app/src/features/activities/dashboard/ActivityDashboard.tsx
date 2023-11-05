import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import ActivityFilters from './ActivityFilters';

{/* Destructure the interface by indicating the required child property */}
export default observer (function ActivityDashboard() {

	const { activityStore } = useStore(); 
	const { loadActivities, activityRegistry } = activityStore;

	//Destructuring the object because we're only interest in the ActivityStore at this stage

	{/*[component, function] all useState() hooks are independent states from eachother.*/ }
	// const [activities, setActivities] = useState<Activity[]>([]);
	// used to pass information to indicate a specified activity


	{/*accepts functions, needs dependencies*/ }
	useEffect(() => {
		if (activityRegistry.size <= 1) loadActivities();
		{/*dependencies go below in brackets*/ }
	}, [loadActivities, activityRegistry.size])

	if (activityStore.loadingInitial) return <LoadingComponent content='Loading app' />

	return (
		<Grid>
			<Grid.Column width='10'>
				<ActivityList />
			</Grid.Column>
			<Grid.Column width='6'>
				<ActivityFilters/>
			</Grid.Column>
		</Grid>
	)
})