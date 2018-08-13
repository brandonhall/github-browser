import React, { PureComponent } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import { STORAGE_KEY } from './constants';
import NavBar from './features/NavBar';
import Browser from './features/Browser';
import Search from './features/Search';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      org: this.getOrg()
    }
  }

  clearOrg = () => {
    this.setState({ org: null }, () => {
      localStorage.clear();
    });
  };

  setOrg = value => {
    this.setState({ org: value }, () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    });
  };

  getOrg = () => {
    if (!localStorage.hasOwnProperty(STORAGE_KEY)) {
      return;
    }

    const item = localStorage.getItem(STORAGE_KEY);
    return JSON.parse(item);
  };

  render() {
    const { org } = this.state;

    return (
      <div>
        <CssBaseline />
        <NavBar org={org} onClear={this.clearOrg} />
        <Grid container alignItems="center" justify="center">
          {org ? <Browser org={org} /> : <Search onSet={this.setOrg} />}
        </Grid>
      </div>
    )
  }
}

export default App;
