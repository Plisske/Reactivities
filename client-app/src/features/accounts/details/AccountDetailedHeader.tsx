import { observer } from 'mobx-react-lite';
import React from 'react'
import { Button, Header, Item, Segment } from 'semantic-ui-react'
import { Account } from "../../../app/models/account";
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const accountImageStyle = {
    filter: 'brightness(30%)'
};

const accountImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    account: Account
}

export default observer(function AccountDetailedHeader({ account }: Props) {
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{ padding: '0' }}>
                <Segment style={accountImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={account.balance}
                                    style={{ color: 'white' }}
                                />
                                <p>{format(account.date!, 'dd MMM yyyy')}</p>
                                <p>
                                    Balance
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button as={Link} to={`/manageaccount/${account.id}`} color='orange' floated='right'>
                    Manage Event
                </Button>
            </Segment>
        </Segment.Group>
    )
})