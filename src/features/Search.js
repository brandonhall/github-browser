import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { Notify, Select } from '../components';
import { TRIGGER_CHARS } from '../constants';
import api from '../api';

const usersEndpoint = value => `search/users?q=${value}+type:org`;

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
  }
});

const propTypes = {
  onSet: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

class Search extends PureComponent {
  static propTypes = propTypes;

  state = {
    error: '',
  };

  getItems = ({ items }) => {
    return items.map(({ id, login }) => ({ value: id, label: login }));
  };

  loadOptions = (value, callback) => {
    if (value.length < TRIGGER_CHARS) {
      return Promise.resolve();
    }

    const params = {
      per_page: 10
    };

    return api.get(usersEndpoint(value), { params })
      .then(response => callback(this.getItems(response)))
      .catch(error =>this.setState({ error }));
  };

  handleChange = option => {
    this.props.onSet(option);
  };

  render() {
    const { classes } = this.props;
    const { error } = this.state;

    return (
      <Grid className={classes.root} item xs={6}>
        <Notify status="error" message={error} />
        <Select
          cacheOptions
          defaultOptions
          loadOptions={this.loadOptions}
          onChange={this.handleChange}
          noOptionsMessage={() => "No organizations found"}
          placeholder="Type to search for GitHub organizations..."
        />
      </Grid>
    )
  }
}

export default withStyles(styles)(Search);
