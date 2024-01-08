import React, { Fragment } from 'react';
import { Header, } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import AccountListItem from './AccountListItem';

interface Props {
    deleteAccount: (id: string) => void;
}

export default observer(function AccountList({deleteAccount}: Props) {
    const { accountStore } = useStore();
    const { groupedAccounts } = accountStore;


    return (
        <Fragment>
            {groupedAccounts.map(([group, accounts]) => (
                <Fragment key={group}>
                    {accounts.map(account => (
                        <AccountListItem key={account.id}
                            account={account}
                            deleteAccount={deleteAccount}
                        />
                    ))}
                </Fragment>
            ))}
        </Fragment>

    )
})