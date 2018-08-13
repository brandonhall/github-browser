import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    zIndex: theme.zIndex.drawer + 1,
  },
  flex: {
    flexGrow: 1,
  }
});

const propTypes = {
  org: PropTypes.object,
  onClear: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

const NavBar = ({ classes, org, onClear }) => (
  <AppBar position="static" className={classes.root}>
    <Toolbar>
      <Typography className={classes.flex} variant="title" color="inherit">
        GitHub Browser
      </Typography>
      {org && (
        <Button color="inherit" onClick={onClear}>New Organization</Button>
      )}
    </Toolbar>
  </AppBar>
);

NavBar.propTypes = propTypes;

export { NavBar };
export default withStyles(styles)(NavBar);
