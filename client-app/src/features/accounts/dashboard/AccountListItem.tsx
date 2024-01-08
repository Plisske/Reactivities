import React, { SyntheticEvent, useState } from 'react';
import { Button, Grid, Icon, Item, Segment } from 'semantic-ui-react';
import { Account } from '../../../app/models/account';
import { Link } from 'react-router-dom';

interface Props {
    account: Account
    deleteAccount: (id: string) => void;
}

export default function AccountListItem({ account, deleteAccount }: Props) {

    const [target, setTarget] = useState(``);
    function handleAccountDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteAccount(id);
    }

    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Content>
                            <Item.Header as={Link} to={`/accounts/${account.id}`}>
                                {account.title}
                            </Item.Header>
                            <Item.Description> Current Balance: ${account.balance}</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>

            <Segment clearing>
                <Button
                    as={Link}
                    to={`/deposit/${account.id}`}
                    color='green'
                    floated='left'
                    content='Deposit'
                />
                <Button
                    as={Link}
                    to={`/withdraw/${account.id}`}
                    color='red'
                    floated='left'
                    content='Withdraw'
                />
                <Button
                    name={account.id}
                    loading={target == account.id}
                    onClick={(e) => handleAccountDelete(e, account.id)}
                    floated='right'
                    content='Delete'
                    color='red'
                />
            </Segment>
        </Segment.Group>
    )
}