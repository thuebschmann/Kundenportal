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

import { update, fetch } from '../../stores/projekt_access/projekt_accessSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditProjekt_access = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    users_id: [],

    projekt_id: [],

    level: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { projekt_access } = useAppSelector((state) => state.projekt_access);

  const { projekt_accessId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: projekt_accessId }));
  }, [projekt_accessId]);

  useEffect(() => {
    if (typeof projekt_access === 'object') {
      setInitialValues(projekt_access);
    }
  }, [projekt_access]);

  useEffect(() => {
    if (typeof projekt_access === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = projekt_access[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [projekt_access]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: projekt_accessId, data }));
    await router.push('/projekt_access/projekt_access-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit projekt_access')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit projekt_access'}
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
              <FormField label='Benutzer' labelFor='users_id'>
                <Field
                  name='users_id'
                  id='users_id'
                  component={SelectFieldMany}
                  options={initialValues.users_id}
                  itemRef={'users'}
                  showField={'lastName'}
                ></Field>
              </FormField>

              <FormField label='Projekt' labelFor='projekt_id'>
                <Field
                  name='projekt_id'
                  id='projekt_id'
                  component={SelectFieldMany}
                  options={initialValues.projekt_id}
                  itemRef={'projekt'}
                  showField={'id'}
                ></Field>
              </FormField>

              <FormField label='Zugriffsebene'>
                <Field name='level' placeholder='Zugriffsebene' />
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
                  onClick={() =>
                    router.push('/projekt_access/projekt_access-list')
                  }
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditProjekt_access.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default EditProjekt_access;
