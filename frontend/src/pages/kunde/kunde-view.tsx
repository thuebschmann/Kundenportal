import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/kunde/kundeSlice';
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

const KundeView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { kunde } = useAppSelector((state) => state.kunde);

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
        <title>{getPageTitle('View kunde')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View kunde')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>name</p>
            <p>{kunde?.name}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>vorname</p>
            <p>{kunde?.vorname}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>strasse</p>
            <p>{kunde?.strasse}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>plz</p>
            <p>{kunde?.plz}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>ort</p>
            <p>{kunde?.ort}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>land</p>
            <p>{kunde?.land}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>partnernr</p>
            <p>{kunde?.partnernr}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>firma</p>
            <p>{kunde?.firma}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Benutzer</p>

            <p>{kunde?.user?.lastName ?? 'No data'}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Projekt kunde_id</p>
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
                    {kunde.projekt_kunde_id &&
                      Array.isArray(kunde.projekt_kunde_id) &&
                      kunde.projekt_kunde_id.map((item: any) => (
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
              {!kunde?.projekt_kunde_id?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/kunde/kunde-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

KundeView.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default KundeView;
