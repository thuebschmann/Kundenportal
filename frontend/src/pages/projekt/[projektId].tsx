import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

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
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { RichTextField } from '../../components/RichTextField';

import { update, fetch } from '../../stores/projekt/projektSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditProjekt = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    kunde_id: '',

    name: '',

    status: '',

    url: '',

    apikey: '',

    username: '',

    password: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { projekt } = useAppSelector((state) => state.projekt);

  const { projektId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: projektId }));
  }, [projektId]);

  useEffect(() => {
    if (typeof projekt === 'object') {
      setInitialValues(projekt);
    }
  }, [projekt]);

  useEffect(() => {
    if (typeof projekt === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = projekt[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [projekt]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: projektId, data }));
    await router.push('/projekt/projekt-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit projekt')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit projekt'}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='kunde_id' labelFor='kunde_id'>
                <Field
                  name='kunde_id'
                  id='kunde_id'
                  component={SelectField}
                  options={initialValues.kunde_id}
                  itemRef={'kunde'}
                  showField={'name'}
                ></Field>
              </FormField>

              <FormField label='Bezeichnung'>
                <Field name='name' placeholder='Bezeichnung' />
              </FormField>

              <FormField label='Status'>
                <Field type='number' name='status' placeholder='Status' />
              </FormField>

              <FormField label='Webaddresse'>
                <Field name='url' placeholder='Webaddresse' />
              </FormField>

              <FormField label='API-Schlüssel'>
                <Field name='apikey' placeholder='API-Schlüssel' />
              </FormField>

              <FormField label='Login-Benutzername'>
                <Field name='username' placeholder='Login-Benutzername' />
              </FormField>

              <FormField label='Login-Passwort'>
                <Field name='password' placeholder='Login-Passwort' />
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
                  onClick={() => router.push('/projekt/projekt-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditProjekt.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default EditProjekt;
