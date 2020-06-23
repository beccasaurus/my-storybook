// @flow
import React from 'react';
import { mount } from 'enzyme';
import { ExampleComponent } from '.';

const specs = describe('ExampleComponent', () => {
  it('shows correct text', () => {
    const wrapper = mount(<ExampleComponent text='Hello, world!' />);
    expect(wrapper.text()).toEqual('Example Component: Hello, world!');
  });
});

export default specs;
