import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Icon } from '../components';

const styles = () => ({
  link: {
    display: 'inline',
  },
});

const propTypes = {
  classes: PropTypes.object.isRequired,
  details: PropTypes.object.isRequired,
};

class Details extends PureComponent {
  static propTypes = propTypes;

  renderLocation = () => {
    const { details } = this.props;

    return (
      <Grid item component={Typography} variant="caption">
        <Icon>location_on</Icon>
        {details.location}
      </Grid>
    )
  };

  renderBlog() {
    const { classes, details } = this.props;

    return (
      <Grid item component={Typography} variant="caption">
        <Icon>link</Icon>
        <Typography
          className={classes.link}
          component="a"
          target="_blank"
          href={details.blog}
          variant="caption"
        >
          {details.blog}
        </Typography>
      </Grid>
    )
  }

  renderEmail() {
    const { details } = this.props;

    return (
      <Grid item component={Typography} variant="caption">
        <Icon>email</Icon>
        {details.email}
      </Grid>
    )
  }

  render() {
    const { details } = this.props;

    return (
      <Grid container spacing={16}>
        <Grid item>
          <img alt={details.login} height={100} width={100} src={details.avatar_url} />
        </Grid>
        <Grid item xs={10}>
          <Typography gutterBottom variant="headline">{details.name}</Typography>
          <Typography gutterBottom>{details.description}</Typography>
          <Grid container alignItems="center" spacing={8}>
            {details.location && this.renderLocation()}
            {details.blog && this.renderBlog()}
            {details.email && this.renderEmail()}
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(Details);
