import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

//exports from react returns jsx
export default function NavBar() {

    return(
        <Menu inverted fixed='top'>
            <Container>
                {/*Each NavLink requires a "to=''" element after it to show where you are going.*/ }
                {/*brings us to our home page, which is just a /.*/ }
                <Menu.Item as={NavLink} to='/' header>
                    <img src="/assets/logo.png" alt="logo" style={{ marginRight: '10px' }} />
                    Reactivities
                </Menu.Item>
                <Menu.Item as={NavLink} to='/activities' name='Activities' />
                <Menu.Item as={NavLink} to='/errors' name='Errors' />
                <Menu.Item>
                    <Button as={NavLink} to ='/createActivity' positive content ='Create Activity' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}