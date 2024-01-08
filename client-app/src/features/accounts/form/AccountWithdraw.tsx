import React, { useEffect, useRef, useState } from 'react';
import { Button, Header, Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Account } from '../../../app/models/account';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { v4 as uuid } from 'uuid';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import { accountOptions } from '../../../app/common/options/accountOptions';
import MySelectInput from '../../../app/common/form/MySelectInput';
import MyDateInput from '../../../app/common/form/MyDateInput';

// classtype : name, activity: selected activity
export default observer(function AccountWithdraw() {

    const { accountStore } = useStore();
    const { selectedAccount, createAccount, withdrawAccount, loading, loadAccount, loadingInitial } = accountStore;

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

    const old_balance = useRef(0)

    const validationSchema = Yup.object({
        balance: Yup.number().required()
    })

    useEffect(() => {
        if (id) {
            loadAccount(id).then(account => setAccount(account!))
            loadAccount(id).then(account => old_balance.current = account!.balance)
        }
    }, [id, loadAccount])

    function handleFormSubmit(account: Account) {
            account.balance = old_balance.current - account.balance;
            withdrawAccount(account).then(() => navigate(`/accounts`));
    }

    ////works with the "onChange" element in the form by using "event" class
    //function handleInputChange(event: ChangeEvent<HTMLInputElement |HTMLTextAreaElement>) {
    //    const { name, value } = event.target;
    //    // "...class" = spread the existing properties of the activity 
    //    setActivity({...activity, [name]:value })
    //}

    //if (loadingInitial) return <LoadingComponent content = 'Loading activity...'/>

    return (
        <Segment clearing>
            <Header content='Account Details' sub color='teal' />
            <Item>
                <Item.Content>
                    <Item.Header as={Link} to={`/accounts/${account.id}`}>
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
                        <MyTextArea rows={1} placeholder='Balance' name='balance' />
                        <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={loading} floated='right' positive type='submit' content='Withdraw' />
                        <Button as={Link} to='/accounts' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>

        </Segment>
    )
})