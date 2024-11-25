import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { CircularProgress, Box, Grid } from '@mui/material';
import {
  useManagementDispatch,
  useManagementState,
} from '../../context/ManagementContext';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';
// styles
import useStyles from './styles';
// components
import Widget from '../../components/Widget/Widget';

const Dashboard = () => {
  let classes = useStyles();
  const managementDispatch = useManagementDispatch();
  const managementValue = useManagementState();

  const [users, setUsers] = useState(0);
  const [kunde, setKunde] = useState(0);
  const [projekt, setProjekt] = useState(0);
  const [rechnungen, setRechnungen] = useState(0);

  const [currentUser, setCurrentUser] = useState(null);

  async function loadData() {
    const fns = [setUsers, setKunde, setProjekt, setRechnungen];

    const responseUsers = axios.get(`/users/count`);
    const responseKunde = axios.get(`/kunde/count`);
    const responseProjekt = axios.get(`/projekt/count`);
    const responseRechnungen = axios.get(`/rechnungen/count`);
    Promise.allSettled([
      responseUsers,
      responseKunde,
      responseProjekt,
      responseRechnungen,
    ]).then((res) =>
      res.forEach((el, i) => {
        if (el.status === 'fulfilled') {
          fns[i](el.value.data.count);
        }
      }),
    );
  }
  useEffect(() => {
    setCurrentUser(managementValue.currentUser);
    loadData();
  }, [managementDispatch, managementValue]);

  if (!currentUser) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='100vh'
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <h1 className='page-title'>
        Welcome, {currentUser.firstName}! <br />
        <small>
          <small>Your role is {currentUser.role}</small>
        </small>
      </h1>
      <Grid container alignItems='center' columns={12} spacing={3}>
        {
          <Grid item xs={12} sm={6} lg={4} xl={3}>
            <Link to={'/admin/users'} style={{ textDecoration: 'none' }}>
              <Widget title={'Users'}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <InfoIcon color='primary' sx={{ mr: 1 }} />
                  <p className={classes.widgetText}>
                    Users:{' '}
                    <span className={classes.widgetTextCount}>{users}</span>
                  </p>
                </div>
              </Widget>
            </Link>
          </Grid>
        }

        {
          <Grid item xs={12} sm={6} lg={4} xl={3}>
            <Link to={'/admin/kunde'} style={{ textDecoration: 'none' }}>
              <Widget title={'Kunde'}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <InfoIcon color='primary' sx={{ mr: 1 }} />
                  <p className={classes.widgetText}>
                    Kunde:{' '}
                    <span className={classes.widgetTextCount}>{kunde}</span>
                  </p>
                </div>
              </Widget>
            </Link>
          </Grid>
        }

        {
          <Grid item xs={12} sm={6} lg={4} xl={3}>
            <Link to={'/admin/projekt'} style={{ textDecoration: 'none' }}>
              <Widget title={'Projekt'}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <InfoIcon color='primary' sx={{ mr: 1 }} />
                  <p className={classes.widgetText}>
                    Projekt:{' '}
                    <span className={classes.widgetTextCount}>{projekt}</span>
                  </p>
                </div>
              </Widget>
            </Link>
          </Grid>
        }

        {
          <Grid item xs={12} sm={6} lg={4} xl={3}>
            <Link to={'/admin/rechnungen'} style={{ textDecoration: 'none' }}>
              <Widget title={'Rechnungen'}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <InfoIcon color='primary' sx={{ mr: 1 }} />
                  <p className={classes.widgetText}>
                    Rechnungen:{' '}
                    <span className={classes.widgetTextCount}>
                      {rechnungen}
                    </span>
                  </p>
                </div>
              </Widget>
            </Link>
          </Grid>
        }
      </Grid>
    </div>
  );
};

export default Dashboard;
