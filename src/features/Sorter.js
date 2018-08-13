import React from 'react';
import PropTypes from 'prop-types';
import { Grid, MenuItem, Select, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  item: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  button: {
    color: theme.palette.text.secondary,
    textTransform: 'none'
  }
});

const propTypes = {
  sort: PropTypes.string.isRequired,
  onSort: PropTypes.func.isRequired,
};

const Sorter = ({ sort, onSort }) => (
  <Grid container spacing={8} alignItems="center">
    <Grid item>
      <Typography variant="subheading">Sort By</Typography>
    </Grid>
    <Grid item>
      <Select value={sort} onChange={onSort}>
        <MenuItem value={'forks_count'}>Popularity (Forks)</MenuItem>
        <MenuItem value={'stargazers_count'}>Stargazers</MenuItem>
        <MenuItem value={'open_issues_count'}>Open Issues</MenuItem>
      </Select>
    </Grid>
  </Grid>
);

Sorter.propTypes = propTypes;

export default withStyles(styles)(Sorter);
