import { configure } from '@storybook/react';
import 'semantic-ui-css/semantic.min.css';

// automatically import all files ending in *.stories.js
configure(require.context('../src/stories', true, /\.stories\.js$/), module);
