import {
  mdiAccount,
  mdiChartTimelineVariant,
  mdiMail,
  mdiUpload,
} from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';

import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SwitchField } from '../../components/SwitchField';

import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { RichTextField } from '../../components/RichTextField';

import { create } from '../../stores/users/usersSlice';
import { useAppDispatch } from '../../stores/hooks';
import { useRouter } from 'next/router';
import moment from 'moment';

const initialValues = {
  firstName: '',

  lastName: '',

  phoneNumber: '',

  email: '',

  role: '',

  disabled: false,

  avatar: [],

  idusers: '',

  registratedat: '',
};

const UsersNew = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (data) => {
    await dispatch(create(data));
    await router.push('/users/users-list');
  };
  return (
    <>
      <Head>
        <title>{getPageTitle('New Item')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title='New Item'
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='Vorname'>
                <Field name='firstName' placeholder='Vorname' />
              </FormField>

              <FormField label='Nachname'>
                <Field name='lastName' placeholder='Nachname' />
              </FormField>

              <FormField label='Telefon'>
                <Field name='phoneNumber' placeholder='Telefon' />
              </FormField>

              <FormField label='E-mail'>
                <Field name='email' placeholder='E-mail' />
              </FormField>

              <FormField label='Role'>
                <FormCheckRadioGroup>
                  <FormCheckRadio type='radio' label='admin'>
                    <Field type='radio' name='role' value='admin' />
                  </FormCheckRadio>

                  <FormCheckRadio type='radio' label='user'>
                    <Field type='radio' name='role' value='user' />
                  </FormCheckRadio>
                </FormCheckRadioGroup>
              </FormField>

              <FormField label='Disabled' labelFor='disabled'>
                <Field
                  name='disabled'
                  id='disabled'
                  component={SwitchField}
                ></Field>
              </FormField>

              <FormField>
                <Field
                  label='Avatar'
                  color='info'
                  icon={mdiUpload}
                  path={'users/avatar'}
                  name='avatar'
                  id='avatar'
                  schema={{
                    size: undefined,
                    formats: undefined,
                  }}
                  component={FormImagePicker}
                ></Field>
              </FormField>

              <FormField label='idusers'>
                <Field type='number' name='idusers' placeholder='idusers' />
              </FormField>

              <FormField label='registratedat'>
                <Field
                  type='datetime-local'
                  name='registratedat'
                  placeholder='registratedat'
                />
              </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() => router.push('/users/users-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

UsersNew.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default UsersNew;
