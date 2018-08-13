import React from 'react';
import PropTypes from 'prop-types';
import { Icon as MuiIcon } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  icon: {
    fontSize: 16,
    verticalAlign: 'middle',
    marginRight: 2,
  },
});

const propTypes = {
  children: PropTypes.any.isRequired,
  classes: PropTypes.object.isRequired,
};

const Icon = ({ children, classes }) => (
  <MuiIcon className={classes.icon}>{children}</MuiIcon>
);

Icon.propTypes = propTypes;

export default withStyles(styles)(Icon);
