import { configure } from '@storybook/react';
import './test';
configure(require.context('../src/stories', true, /\.stories\.js$/), module);
