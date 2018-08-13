import React from 'react';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/lib/Async';
import { withStyles } from '@material-ui/core/styles';

import components from './components';
import styles from './styles';

const propTypes = {
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const Select = ({ classes, theme, ...props }) => {
  const selectStyles = {
    input: base => ({
      ...base,
      color: theme.palette.text.primary,
    }),
  };

  return (
    <AsyncSelect
      classes={classes}
      styles={selectStyles}
      components={components}
      {...props}
    />
  )
};

Select.propTypes = propTypes;

export default withStyles(styles, { withTheme: true })(Select);
