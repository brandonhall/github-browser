import React, { PureComponent, } from 'react';
import PropTypes from 'prop-types';
import { Snackbar, } from '@material-ui/core';
import { withStyles, } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    top: theme.mixins.toolbar.minHeight + (theme.spacing.unit * 2),
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
});

const propTypes = {
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  onClose: PropTypes.func,
  status: PropTypes.oneOf([
    'error',
    'info',
  ]).isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
  }).isRequired,
};

class Notify extends PureComponent {
  static propTypes = propTypes;

  state = {
    open: true,
  };

  handleClose = () => {
    const { onClose, } = this.props;
    this.setState({ open: false, }, onClose);
  };

  render() {
    const { classes, message, status, } = this.props;
    const { open, } = this.state;

    if (!message) {
      return null;
    }

    return (
      <Snackbar
        className={classes.root}
        ContentProps={{ className: classes[status], }}
        open={open}
        anchorOrigin={{ vertical: 'top', horizontal: 'center', }}
        onClose={this.handleClose}
        message={<span>{String(message)}</span>}
      />
    );
  }
}

export default withStyles(styles)(Notify);
