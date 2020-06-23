import React from 'react';
import { mount } from 'enzyme';
import { AnotherComponent } from '.';

describe('AnotherComponent', () => {
  it('shows correct text', () => {
    const wrapper = mount(<AnotherComponent />);
    expect(wrapper.text()).toEqual('Hello from another component!');
  });
});
