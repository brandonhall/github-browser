import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Drawer, Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { Notify, Spinner } from '../components';
import api from '../api';

const styles = theme => ({
  inline: {
    display: 'inline',
  },
  wrapper: {
    padding: theme.spacing.unit * 2,
  },
  image: {
    marginRight: theme.spacing.unit / 2,
    verticalAlign: 'middle',
  },
  item: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  }
});

const propTypes = {
  commitsUrl: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

class Commits extends Component {
  static propTypes = propTypes;

  state = {
    commits: null,
    error: '',
  };

  componentDidUpdate(prevProps) {
    const { commitsUrl } = this.props;
    const hasChanged = prevProps.commitsUrl !== commitsUrl;

    if (this.showCommits() && hasChanged) {
      this.setState({ commits: null }, this.fetchCommits);
    }
  }

  showCommits() {
    return !!this.props.commitsUrl;
  }

  fetchCommits() {
    const { commitsUrl } = this.props;
    const params = {
      per_page: 20,
    };

    api.get(commitsUrl, { params })
      .then(commits => this.setState({ commits }))
      .catch(error => this.setState({ error }));
  }

  renderAuthor(commitObject) {
    const { classes } = this.props;
    const { author, commit } = commitObject;
    const { author: { name }} = commit;

    if (!author) {
      return <span>{name}</span>;
    }

    const { login, avatar_url, html_url } = author;

    return (
      <Typography
        component="a"
        target="_blank"
        variant="caption"
        href={html_url}
        className={classes.inline}
      >
        <img className={classes.image} width={20} height={20} alt={login} src={avatar_url} />
        {login}
      </Typography>
    );
  }

  renderCommit = (commitObject) => {
    const { classes } = this.props;
    const { sha, html_url, commit: { message, author: { date } } } = commitObject;

    return (
      <Grid item key={sha} xs={12} className={classes.item}>
        <Typography gutterBottom href={html_url} component="a" target="_blank">
          {message}
        </Typography>
        <Grid container alignItems="center">
          <Grid item>
            <Typography variant="caption">
              {this.renderAuthor(commitObject)}
              {' '}
              committed on {moment(date).format('ll')}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  renderCommits() {
    const { commits } = this.state;

    return (
      <Grid container spacing={16}>
        {commits.map(this.renderCommit)}
      </Grid>
    );
  }

  render() {
    const { classes, onClose } = this.props;
    const { commits, error } = this.state;

    return (
      <div>
        <Notify status="error" message={error} />
        <Drawer anchor="right" open={this.showCommits()} onClose={onClose}>
          <div className={classes.wrapper} style={{ width: window.outerWidth / 2 }}>
            {commits ? this.renderCommits() : <Spinner />}
          </div>
        </Drawer>
      </div>
    );
  }
}


export { Commits };
export default withStyles(styles)(Commits);
