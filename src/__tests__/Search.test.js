import React from 'react';
import { mount } from 'enzyme';
import Search from '../features/Search';

let component;

describe('Search', () => {
  beforeEach(() => {
    component = mount(<Search onSet={jest.fn} />);
  });

  afterEach(() => {
    component.unmount();
  });

  it('renders Select with placeholder', () => {
    const placeholder = 'Type to search for GitHub organizations...';

    expect(component.text()).toContain(placeholder);
  });

  it('renders no results text', () => {
    const noOptionsText = 'No organizations found';
    component.find('input').simulate('change');

    expect(component.text()).toContain(noOptionsText);
  });

  it('transforms items', () => {
    const instance = component.children().instance();
    const stub = {
      total_count: 2,
      incomplete_results: false,
      items: [
        { login: 'tester1', id: 1 },
        { login: 'tester2', id: 2 }
      ]
    };

    expect(instance.getItems(stub)).toEqual([
      { value: 1, label: 'tester1' },
      { value: 2, label: 'tester2' }
    ])
  });
});
