import React from 'react';
import { mount } from 'enzyme';
import { NavBar } from '../features/NavBar';

const props = {
  classes: {},
  onClear: jest.fn,
};

let component;

describe('NavBar', () => {
  beforeEach(() => {
    component = mount(<NavBar {...props} />);
  });

  afterEach(() => {
    component.unmount();
  });

  it('does not render "New Organization" when org is missing', () => {
    expect(component.text()).not.toContain('New Organization');
  });

  it('renders "New Organization" when org is present', () => {
    component.setProps({
      org: { label: 'Test', id: 1 }
    });

    expect(component.text()).toContain('New Organization');
  });
});
