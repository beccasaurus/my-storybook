import React from 'react';
import { mount } from 'enzyme';
import App from './App';

export const appTests = describe('App', () => {
  it('Says Hello', () => {
    const wrapper = mount(<App />);
    expect(wrapper.text()).toContain('Hello');
  });
  it('Does not say Goodbye', () => {
    const wrapper = mount(<App />);
    expect(wrapper.text()).toContain('Goodbye'); // should fail
  });
});
