import React from 'react';
import { mount } from 'enzyme';
import { Browser } from '../features/Browser';

const props = {
  classes: {},
  org: {
    label: 'Test',
    id: 1,
  }
};

const details = {
  name: 'Test Org',
  description: 'Test Description',
  location: 'Location',
  blog: 'http://test.com',
  email: 'test@test.com'
};

const repos = [
  {
    id: 1,
    name: 'Test 1',
    description: 'First Description',
    forks_count: 1,
    stargazers_count: 2,
    open_issues_count: 3,
    language: 'JavaScript',
    commits_url: 'commitslivehere.com'
  },
  {
    id: 2,
    name: 'Test 2',
    description: 'Second Description',
    forks_count: 4,
    stargazers_count: 5,
    open_issues_count: 6,
    language: 'Go'
  },
];

let component;

describe('Browser', () => {
  beforeEach(() => {
    Browser.prototype.fetchOrg = jest.fn();
    Browser.prototype.fetchRepos = jest.fn();

    component = mount(<Browser {...props} />);
    component.setState({ details, repos });
  });

  afterEach(() => {
    component.unmount();
  });

  describe('Details', () => {
    it('renders name', () => {
      expect(component.text()).toContain(details.name);
    });

    it('renders description', () => {
      expect(component.text()).toContain(details.description);
    });

    it('renders location', () => {
      expect(component.text()).toContain(details.location);
    });

    it('renders blog url', () => {
      expect(component.text()).toContain(details.blog);
    });

    it('renders email', () => {
      expect(component.text()).toContain(details.email);
    });
  });

  describe('Sorting', () => {
    it('defaults to Popularity (Forks)', () => {
      expect(component.find('Select').props().value).toEqual('forks_count');
    });
  });

  describe('Repos', () => {
    it('renders name', () => {
      expect(component.text()).toContain(repos[0].name);
    });

    it('renders description', () => {
      expect(component.text()).toContain(repos[0].description);
    });

    it('renders language', () => {
      expect(component.text()).toContain(repos[0].language);
    });

    it('renders stargazers', () => {
      expect(component.text()).toContain(repos[0].stargazers_count);
    });

    it('renders forks', () => {
      expect(component.text()).toContain(repos[0].forks_count);
    });

    it('renders browse button correctly', () => {
      expect(component.find('button').first().text())
        .toEqual('Browse Commits');
    });
  })
});
