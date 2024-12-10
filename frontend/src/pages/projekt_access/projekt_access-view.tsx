import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/projekt_access/projekt_accessSlice';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';
import LayoutAuthenticated from '../../layouts/Authenticated';
import { getPageTitle } from '../../config';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import SectionMain from '../../components/SectionMain';
import CardBox from '../../components/CardBox';
import BaseButton from '../../components/BaseButton';
import BaseDivider from '../../components/BaseDivider';
import { mdiChartTimelineVariant } from '@mdi/js';
import { SwitchField } from '../../components/SwitchField';
import FormField from '../../components/FormField';

const Projekt_accessView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { projekt_access } = useAppSelector((state) => state.projekt_access);

  const { id } = router.query;

  function removeLastCharacter(str) {
    console.log(str, `str`);
    return str.slice(0, -1);
  }

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View projekt_access')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View projekt_access')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <>
            <p className={'block font-bold mb-2'}>Benutzer</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Vorname</th>

                      <th>Nachname</th>

                      <th>Telefon</th>

                      <th>E-mail</th>

                      <th>Role</th>

                      <th>Disabled</th>

                      <th>idusers</th>

                      <th>registratedat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projekt_access.users_id &&
                      Array.isArray(projekt_access.users_id) &&
                      projekt_access.users_id.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/users/users-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='firstName'>{item.firstName}</td>

                          <td data-label='lastName'>{item.lastName}</td>

                          <td data-label='phoneNumber'>{item.phoneNumber}</td>

                          <td data-label='email'>{item.email}</td>

                          <td data-label='role'>{item.role}</td>

                          <td data-label='disabled'>
                            {dataFormatter.booleanFormatter(item.disabled)}
                          </td>

                          <td data-label='idusers'>{item.idusers}</td>

                          <td data-label='registratedat'>
                            {dataFormatter.dateTimeFormatter(
                              item.registratedat,
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!projekt_access?.users_id?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Projekt</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Bezeichnung</th>

                      <th>Status</th>

                      <th>Webaddresse</th>

                      <th>API-Schlüssel</th>

                      <th>Login-Benutzername</th>

                      <th>Login-Passwort</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projekt_access.projekt_id &&
                      Array.isArray(projekt_access.projekt_id) &&
                      projekt_access.projekt_id.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/projekt/projekt-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='name'>{item.name}</td>

                          <td data-label='status'>{item.status}</td>

                          <td data-label='url'>{item.url}</td>

                          <td data-label='apikey'>{item.apikey}</td>

                          <td data-label='username'>{item.username}</td>

                          <td data-label='password'>{item.password}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!projekt_access?.projekt_id?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Zugriffsebene</p>
            <p>{projekt_access?.level}</p>
          </div>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/projekt_access/projekt_access-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

Projekt_accessView.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default Projekt_accessView;
