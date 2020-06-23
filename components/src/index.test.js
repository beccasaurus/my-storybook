import React from 'react';
import { mount } from 'enzyme';
import { ExampleComponent } from '.';

describe('ExampleComponent', () => {
  it('shows correct text', () => {
    const wrapper = mount(<ExampleComponent text='Hello, world!' />);
    expect(wrapper.text()).toEqual('Example Component: Hello, world!');
  });
});
