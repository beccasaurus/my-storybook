import { configure } from '@storybook/react';
import './test';
configure(require.context('../', true, /\.stories\.tsx$/), module);
