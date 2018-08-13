import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { Notify, Spinner } from '../components';
import axios from 'axios';
import api from '../api';

import Details from './Details';
import Sorter from './Sorter';
import Repos from './Repos';
import Commits from './Commits';

const orgsEndpoint = org => `orgs/${org}`;
const reposEndpoint = org => `orgs/${org}/repos`;

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

const propTypes = {
  org: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

class Browser extends Component {
  static propTypes = propTypes;

  state = {
    sortBy: 'forks_count',
    commitsUrl: '',
    details: null,
    repos: null,
    error: '',
  };

  componentDidMount() {
    this.fetchOrg();
    this.fetchRepos();
  }

  onClose = () => {
    this.setState({ commitsUrl: '' });
  };

  handleSort = sortBy => {
    const { repos } = this.state;
    const sortedRepos = repos.sort((a, b) => b[sortBy] - a[sortBy]);

    this.setState({ sortBy, repos: sortedRepos });
  };

  onSort = ({ target }) => {
    const { value } = target;
    this.handleSort(value);
  };

  onRepoSuccess = (repos) => {
    const { sortBy } = this.state;
    this.setState({ repos }, () => this.handleSort(sortBy));
  };

  onBrowse = commitsUrl => {
    this.setState({ commitsUrl });
  };

  fetchOrg() {
    const { org: { label } } = this.props;

    api.get(orgsEndpoint(label))
      .then(details => this.setState({ details }))
      .catch(error => this.setState({ error }));
  }

  fetchRepos() {
    const { org: { label } } = this.props;
    const params = {
      per_page: 100,
    };

    axios.get(reposEndpoint(label), { params })
      .then(this.onRepoSuccess)
      .catch(error => this.setState({ error }));
  }

  renderRepos() {
    const { commitsUrl, repos, sortBy } = this.state;

    return (
      <Grid container direction="column" spacing={16}>
        <Grid item>
          <Sorter sort={sortBy} onSort={this.onSort} />
        </Grid>
        <Grid item>
          <Repos repos={repos} onBrowse={this.onBrowse} />
        </Grid>
        <Commits commitsUrl={commitsUrl} onClose={this.onClose} />
      </Grid>
    )
  }

  render() {
    const { classes } = this.props;
    const { details, repos, error } = this.state;

    return (
      <div className={classes.root}>
        <Notify status="error" message={error} />
        {details ? <Details details={details} /> : <Spinner />}
        {repos ? this.renderRepos(): <Spinner />}
      </div>
    );
  }
}

export { Browser };
export default withStyles(styles)(Browser);
