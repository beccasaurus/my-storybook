import React from 'react';
import { mount } from 'enzyme';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('shows correct text', () => {
    const wrapper = mount(<MyComponent />);
    expect(wrapper.text()).toEqual('Hello there! And also "Defaul text"');
  });
});
