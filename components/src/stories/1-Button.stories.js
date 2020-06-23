import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';
import { specs } from 'storybook-addon-specifications';

import ExampleComponent, { AnotherComponent } from '../';
import exampleComponentSpecs from '../index.test';

export default {
  title: 'Example Component',
  component: ExampleComponent
};

export const Text = () => {
  specs(() => exampleComponentSpecs);
  return <ExampleComponent text='Hello, world!' />;
};

export const ShowAnother = () => <AnotherComponent />;

export const Emoji = () => (
  <Button onClick={action('clicked')}>
    <span role='img' aria-label='so cool'>
      😀 😎 👍 💯
    </span>
  </Button>
);
