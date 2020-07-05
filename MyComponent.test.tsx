import * as React from 'react';
import { mount } from 'enzyme';
import MyComponent from './MyComponent';

export const myComponentTests = describe('My Component', () => {
  it('says Hello', () => {
    const wrapper = mount(<MyComponent hello="This is wonderful" />);
    expect(wrapper.text()).toContain('This is wonderful');
    expect(wrapper.text()).not.toContain('Something completely different');
  });
  it('this one should fail', () => {
    const wrapper = mount(<MyComponent hello="This is wonderful" />);
    expect(wrapper.text()).toContain('This is not what we are expecting');
  });
});
