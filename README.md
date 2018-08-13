GitHub Browser
================

This project is a simple GitHub repository and commit browser for a given organization. The stack was
initialized using [create-react-app](https://github.com/facebook/create-react-app). Tests are written using
[jest](https://github.com/facebook/jest) and [enzyme](https://github.com/airbnb/enzyme). The UI framework 
is the fantastic [material-ui](https://github.com/mui-org/material-ui). Lastly, [axios](https://github.com/axios/axios)
is implemented for communicating with the GitHub API.

**Limitations**

In an effort to limit the scope, this project uses local React state and the test coverage is fairly trivial.
In a production application, test coverage would be much more aggressive and API interactions would be properly mocked.
`redux` or `mobx` would likely be used for state management.

During development, a GitHub OAuth application was created for authenticated calls. This substantially raised
the rate limit and sped up development, but it isn't advisable to commit the `Client Secret`. Anyway, please
be aware of rate limits because they are aggressive.

**Features include:**
 * Auto-suggest during organization search
 * A `localStorage` implementation of the chosen organization
 * Sorting by Popularity (Forks), Stars, and Open Issues
 * A fancy panel for browsing commits :)
 
**Note:** Organization details and repos are intentionally missing from `localStorage`. Arguably, the details could
be saved but the repos and commits are both fairly dynamic.

### Setup

```bash
brew install yarn
yarn install
```

### Running Development

```bash
yarn start
```

### Running Tests

```bash
yarn test
```
