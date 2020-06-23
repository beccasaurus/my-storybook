import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';

import ExampleComponent, { AnotherComponent } from '../';

export default {
  title: 'Example Component',
  component: ExampleComponent
};

export const Text = () => <ExampleComponent text='Hello, world!' />;

export const ShowAnother = () => <AnotherComponent />;

export const Emoji = () => (
  <Button onClick={action('clicked')}>
    <span role='img' aria-label='so cool'>
      😀 😎 👍 💯
    </span>
  </Button>
);
