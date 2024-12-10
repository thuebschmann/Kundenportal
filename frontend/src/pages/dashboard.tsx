import * as icon from '@mdi/js';
import Head from 'next/head';
import React from 'react';
import axios from 'axios';
import type { ReactElement } from 'react';
import LayoutAuthenticated from '../layouts/Authenticated';
import SectionMain from '../components/SectionMain';
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton';
import BaseIcon from '../components/BaseIcon';
import { getPageTitle } from '../config';
import Link from 'next/link';

import { useAppDispatch, useAppSelector } from '../stores/hooks';
const Dashboard = () => {
  const dispatch = useAppDispatch();
  const iconsColor = useAppSelector((state) => state.style.iconsColor);
  const corners = useAppSelector((state) => state.style.corners);
  const cardsStyle = useAppSelector((state) => state.style.cardsStyle);

  const [users, setUsers] = React.useState('Loading...');
  const [affilate, setAffilate] = React.useState('Loading...');
  const [kunde, setKunde] = React.useState('Loading...');
  const [projekt, setProjekt] = React.useState('Loading...');
  const [projekt_access, setProjekt_access] = React.useState('Loading...');
  const [rechnungen, setRechnungen] = React.useState('Loading...');

  const { isFetchingQuery } = useAppSelector((state) => state.openAi);

  async function loadData() {
    const entities = [
      'users',
      'affilate',
      'kunde',
      'projekt',
      'projekt_access',
      'rechnungen',
    ];
    const fns = [
      setUsers,
      setAffilate,
      setKunde,
      setProjekt,
      setProjekt_access,
      setRechnungen,
    ];

    const requests = entities.map((entity, index) => {
      return axios.get(`/${entity.toLowerCase()}/count`);
    });

    Promise.allSettled(requests).then((results) => {
      results.forEach((result, i) => {
        if (result.status === 'fulfilled') {
          fns[i](result.value.data.count);
        } else {
          fns[i](result.reason.message);
        }
      });
    });
  }

  React.useEffect(() => {
    loadData().then();
  }, []);

  return (
    <>
      <Head>
        <title>{getPageTitle('Dashboard')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={icon.mdiChartTimelineVariant}
          title='Overview'
          main
        >
          {''}
        </SectionTitleLineWithButton>

        <div
          id='dashboard'
          className='grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6'
        >
          <Link href={'/users/users-list'}>
            <div
              className={` ${
                corners !== 'rounded-full' ? corners : 'rounded-3xl'
              } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
            >
              <div className='flex justify-between align-center'>
                <div>
                  <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                    Users
                  </div>
                  <div className='text-3xl leading-tight font-semibold'>
                    {users}
                  </div>
                </div>
                <div>
                  <BaseIcon
                    className={`${iconsColor}`}
                    w='w-16'
                    h='h-16'
                    size={48}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    path={icon.mdiAccountGroup || icon.mdiTable}
                  />
                </div>
              </div>
            </div>
          </Link>

          <Link href={'/affilate/affilate-list'}>
            <div
              className={` ${
                corners !== 'rounded-full' ? corners : 'rounded-3xl'
              } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
            >
              <div className='flex justify-between align-center'>
                <div>
                  <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                    Affilate
                  </div>
                  <div className='text-3xl leading-tight font-semibold'>
                    {affilate}
                  </div>
                </div>
                <div>
                  <BaseIcon
                    className={`${iconsColor}`}
                    w='w-16'
                    h='h-16'
                    size={48}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    path={icon.mdiTable || icon.mdiTable}
                  />
                </div>
              </div>
            </div>
          </Link>

          <Link href={'/kunde/kunde-list'}>
            <div
              className={` ${
                corners !== 'rounded-full' ? corners : 'rounded-3xl'
              } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
            >
              <div className='flex justify-between align-center'>
                <div>
                  <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                    Kunde
                  </div>
                  <div className='text-3xl leading-tight font-semibold'>
                    {kunde}
                  </div>
                </div>
                <div>
                  <BaseIcon
                    className={`${iconsColor}`}
                    w='w-16'
                    h='h-16'
                    size={48}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    path={icon.mdiTable || icon.mdiTable}
                  />
                </div>
              </div>
            </div>
          </Link>

          <Link href={'/projekt/projekt-list'}>
            <div
              className={` ${
                corners !== 'rounded-full' ? corners : 'rounded-3xl'
              } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
            >
              <div className='flex justify-between align-center'>
                <div>
                  <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                    Projekt
                  </div>
                  <div className='text-3xl leading-tight font-semibold'>
                    {projekt}
                  </div>
                </div>
                <div>
                  <BaseIcon
                    className={`${iconsColor}`}
                    w='w-16'
                    h='h-16'
                    size={48}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    path={icon.mdiTable || icon.mdiTable}
                  />
                </div>
              </div>
            </div>
          </Link>

          <Link href={'/projekt_access/projekt_access-list'}>
            <div
              className={` ${
                corners !== 'rounded-full' ? corners : 'rounded-3xl'
              } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
            >
              <div className='flex justify-between align-center'>
                <div>
                  <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                    Projekt access
                  </div>
                  <div className='text-3xl leading-tight font-semibold'>
                    {projekt_access}
                  </div>
                </div>
                <div>
                  <BaseIcon
                    className={`${iconsColor}`}
                    w='w-16'
                    h='h-16'
                    size={48}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    path={icon.mdiTable || icon.mdiTable}
                  />
                </div>
              </div>
            </div>
          </Link>

          <Link href={'/rechnungen/rechnungen-list'}>
            <div
              className={` ${
                corners !== 'rounded-full' ? corners : 'rounded-3xl'
              } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
            >
              <div className='flex justify-between align-center'>
                <div>
                  <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                    Rechnungen
                  </div>
                  <div className='text-3xl leading-tight font-semibold'>
                    {rechnungen}
                  </div>
                </div>
                <div>
                  <BaseIcon
                    className={`${iconsColor}`}
                    w='w-16'
                    h='h-16'
                    size={48}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    path={icon.mdiTable || icon.mdiTable}
                  />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </SectionMain>
    </>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default Dashboard;
