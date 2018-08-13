import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';

import { Icon } from '../components';

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
  classes: PropTypes.object.isRequired,
  repos: PropTypes.array.isRequired,
  onBrowse: PropTypes.func.isRequired,
};

class Repos extends Component {
  static propTypes = propTypes;

  onBrowseCommits = ({ currentTarget }) => {
    const { onBrowse } = this.props;
    const { value } = currentTarget;
    const sanitizedCommitUrl = value.split('{/sha}')[0];

    onBrowse(sanitizedCommitUrl);
  };

  renderName = ({ name, html_url }) => (
    <Typography
      gutterBottom
      variant="headline"
      color="primary"
      component="a"
      target="_blank"
      href={html_url}
    >
      {name}
    </Typography>
  );

  renderButton(commitsUrl) {
    const { classes } = this.props;

    return (
      <Grid item>
        <Button
          size="small"
          variant="outlined"
          onClick={this.onBrowseCommits}
          className={classes.button}
          value={commitsUrl}
        >
          Browse Commits
        </Button>
      </Grid>
    );
  }

  renderRepo = repo => {
    const { classes } = this.props;
    const {
      id,
      commits_url,
      forks_count,
      description,
      language,
      stargazers_count,
      updated_at,
    } = repo;

    return (
      <Grid xs={12} item key={id} className={classes.item}>
        {this.renderName(repo)}
        <Typography paragraph>{description}</Typography>
        <Grid container spacing={16} alignItems="center">
          <Grid item component={Typography} variant="caption">
            <Icon>language</Icon> {language}
          </Grid>
          <Grid item component={Typography} variant="caption">
            <Icon>star</Icon> {stargazers_count}
          </Grid>
          <Grid item component={Typography} variant="caption">
            <Icon>scatter_plot</Icon> {forks_count}
          </Grid>
          <Grid item component={Typography} variant="caption">
            Updated {moment(updated_at).fromNow()}
          </Grid>
          {this.renderButton(commits_url)}
        </Grid>
      </Grid>
    );
  };

  render() {
    const { repos } = this.props;

    return (
      <Grid container spacing={32}>
        {repos.map(this.renderRepo)}
      </Grid>
    );
  }
}

export default withStyles(styles)(Repos);
