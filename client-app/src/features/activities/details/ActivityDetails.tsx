import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
    activity: Activity;
    cancelSelectActivity: () => void;
    openForm: (id: string) => void;

}

export default function ActivityDetails({ activity, cancelSelectActivity, openForm }:Props) {
    return (
        // allows the card to take up the remaining columns around it.
        <Card fluid>
            {/*forward apostrophe (the tilde button) allows isnertion of data in strings.*/ }
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span>{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content>
                <Button.Group widths='2'>
                    <Button onClick={() => openForm(activity.id)} basic color ='blue' content='Edit' />
                    <Button onClick={cancelSelectActivity} basic color ='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}