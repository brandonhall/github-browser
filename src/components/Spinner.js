import React from 'react';
import { CircularProgress, Grid } from '@material-ui/core';

const Spinner = () => (
  <Grid container alignItems="center" justify="center">
    <Grid item>
      <CircularProgress />
    </Grid>
  </Grid>
);

export default Spinner;
