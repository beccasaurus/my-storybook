import { describe, it, beforeEach } from 'storybook-addon-specifications';
import expect from 'expect';

import { configure as enzymeConfigure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzymeConfigure({ adapter: new Adapter() });

window.describe = describe;
window.beforeEach = beforeEach;
window.it = it;
window.expect = expect;
