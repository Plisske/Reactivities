import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import AccountList from './AccountList';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';

{/* Destructure the interface by indicating the required child property */ }
export default observer(function AccountDashboard() {

	const { accountStore } = useStore();
	const { loadAccounts, accountRegistry, deleteAccount } = accountStore;

	//Destructuring the object because we're only interest in the ActivityStore at this stage

	{/*[component, function] all useState() hooks are independent states from eachother.*/ }
	// const [activities, setActivities] = useState<Activity[]>([]);
	// used to pass information to indicate a specified activity


	{/*accepts functions, needs dependencies*/ }
	useEffect(() => {
		if (accountRegistry.size <= 1) loadAccounts();
		{/*dependencies go below in brackets*/ }
	}, [loadAccounts, accountRegistry.size])

	if (accountStore.loadingInitial) return <LoadingComponent content='Loading accounts...' />

	return (
		<Grid>
			<Grid.Column width='10'>
				<AccountList deleteAccount = {deleteAccount} />
			</Grid.Column>
		</Grid>
	)
})