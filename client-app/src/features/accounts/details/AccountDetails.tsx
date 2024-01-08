import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import AccountDetailedHeader from './AccountDetailedHeader';
import AccountDetailedInfo from './AccountDetailedInfo';

export default observer(function AccountDetails() {
    const { accountStore } = useStore();
    const { selectedAccount: account, loadAccount, loadingInitial } = accountStore;
    const { id } = useParams();

    useEffect(() => {
        if (id) loadAccount(id);
    }, [id, loadAccount])

    if (loadingInitial || !account) return <LoadingComponent />;

    return (
        <Grid>
            <Grid.Column width={10}>
                <AccountDetailedHeader account={account} />
                <AccountDetailedInfo account={account} />
            </Grid.Column>
        </Grid>
    )
})