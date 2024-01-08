import React, { useEffect, useState } from 'react';
import { Button, Header, Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Account } from '../../../app/models/account';
import { v4 as uuid } from 'uuid';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { accountOptions } from '../../../app/common/options/accountOptions';
import MySelectInput from '../../../app/common/form/MySelectInput';

// classtype : name, activity: selected activity
export default observer(function AccountForm() {

    const { accountStore } = useStore();
    const { selectedAccount, createAccount, updateAccount, loading, loadAccount, loadingInitial } = accountStore;

    const { id } = useParams();
    //returns an imperative method for changing location
    const navigate = useNavigate();

    //if selected activity already has information use it, otherwise initalize everything as an empty string.
    const [account, setAccount] = useState<Account>({
        id: '',
        title: '',
        date: null,
        category: '',
        balance: 0
    });

    const validationSchema = Yup.object({
        balance: Yup.number().required()
    })

    useEffect(() => {
        if (id) loadAccount(id).then(account => setAccount(account!))
    }, [id, loadAccount])

    function handleFormSubmit(account: Account) {
        if (!account.id) {
            account.id = uuid();
            account.date = new Date(account.date!)
            createAccount(account).then(() => navigate(`/accounts`));
        } else {
            updateAccount(account).then(() => navigate(`/accounts`));
        }
    }

    return (
        <Segment clearing>
            <Header content='Account Creation' sub color='teal' />
            <Item>
                <Item.Content>
                    <Item.Header as={Link} to={`/accounts`}>
                        {account.title}
                    </Item.Header>
                    <Item.Description> Current Balance: ${account.balance}</Item.Description>
                </Item.Content>
            </Item>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={account}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='title' placeholder='Title' />
                        <Header content="Type" sub color='teal' />
                        <MySelectInput options={accountOptions} placeholder='Category' name='category' />
                        <Header content="Initial Balance" sub color='teal'/>
                        <MyTextInput placeholder='Balance' name='balance' />
                        <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={loading} floated='right' positive type='submit' content='Submit' />
                        <Button as={Link} to='/accounts' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>

        </Segment>
    )
})