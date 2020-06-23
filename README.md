# 📘 My Storybook Template

> _with React and Flow and Enzyme and Redux_

My currently preferred template for creating React apps.

Includes examples of a variety of things:

- Flow
- React
- Storybook
- Jest/Enzyme
- React Application
- Shared Component Library

One day soon, this will be completely custom.

But, for now, I simply use these lovely tools:

- Create React Application (CRA)
- Create React Library (CRL)

Rather than copy/pasting this code, I follow these steps:

```sh
mkdir todo-app && cd todo-app/
```

## Create Component Libary (optional)

<details>
  <summary><h2>Create Component Library (optional)</h2></summary>

### Create component library

```sh
npx create-react-library todo-components

mv todo-components/ components && cd components/
```

### Update .prettierrc to use semicolons

```diff
diff --git a/.prettierrc b/.prettierrc
index a9646d4..b657a30 100644
--- a/.prettierrc
+++ b/.prettierrc
@@ -1,7 +1,7 @@
 {
   "singleQuote": true,
   "jsxSingleQuote": true,
-  "semi": false,
+  "semi": true,
```

### Add Storybook

```
npx -p @storybook/cli sb init

yarn add -D @storybook/addon-docs
```

```diff
diff --git a/.storybook/main.js b/.storybook/main.js
index 8f79d46..5f60ae0 100644
--- a/.storybook/main.js
+++ b/.storybook/main.js
@@ -4,5 +4,6 @@ module.exports = {
     '@storybook/preset-create-react-app',
     '@storybook/addon-actions',
     '@storybook/addon-links',
-  ],
-};
+    '@storybook/addon-docs'
+  ]
+}
```

### Update Storybook to show library component

```diff
diff --git a/src/stories/1-Button.stories.js b/src/stories/1-Button.stories.js
index 6bcfa21..7dbfe81 100644
--- a/src/stories/1-Button.stories.js
+++ b/src/stories/1-Button.stories.js
@@ -2,16 +2,18 @@ import React from 'react';
 import { action } from '@storybook/addon-actions';
 import { Button } from '@storybook/react/demo';

+import { ExampleComponent } from '../';
+
 export default {
-  title: 'Button',
-  component: Button,
+  title: 'Example Component',
+  component: ExampleComponent
 };

-export const Text = () => <Button onClick={action('clicked')}>Hello Button</Button>;
+export const Text = () => <ExampleComponent text='Hello, world!' />;
```

### Add documentation to library component

```diff
diff --git a/src/index.js b/src/index.js
index 5d66404..461d9df 100644
--- a/src/index.js
+++ b/src/index.js
@@ -1,6 +1,16 @@
-import React from 'react'
-import styles from './styles.module.css'
+import React from 'react';
+import styles from './styles.module.css';

-export const ExampleComponent = ({ text }) => {
-  return <div className={styles.test}>Example Component: {text}</div>
-}
+type Props = {
+  /** My lovely property */
+  text: string
+};
+
+/** My lovely component */
+export const ExampleComponent = ({ text }: Props) => {
+  return <div className={styles.test}>Example Component: {text}</div>;
+};
+
+ExampleComponent.defaultProps = {
+  text: 'Default text'
+};
```

### Add a default export for component library (optional)

```diff
diff --git a/src/index.js b/src/index.js
index 461d9df..dc29031 100644
--- a/src/index.js
+++ b/src/index.js
@@ -14,3 +14,5 @@ export const ExampleComponent = ({ text }: Props) => {
 ExampleComponent.defaultProps = {
   text: 'Default text'
 };
+
+export default ExampleComponent;
diff --git a/src/stories/1-Button.stories.js b/src/stories/1-Button.stories.js
index 7dbfe81..1704845 100644
--- a/src/stories/1-Button.stories.js
+++ b/src/stories/1-Button.stories.js
@@ -2,7 +2,7 @@ import React from 'react';
 import { action } from '@storybook/addon-actions';
 import { Button } from '@storybook/react/demo';

-import { ExampleComponent } from '../';
+import ExampleComponent from '../';

 export default {
   title: 'Example Component',
```

### Add a second component to the library (optional)

```diff
diff --git a/src/AnotherComponent.js b/src/AnotherComponent.js
index e69de29..08bd751 100644
--- a/src/AnotherComponent.js
+++ b/src/AnotherComponent.js
@@ -0,0 +1,5 @@
+import React from 'react';
+
+export function AnotherComponent() {
+  return 'Hello from another component!';
+}
diff --git a/src/index.js b/src/index.js
index dc29031..79db612 100644
--- a/src/index.js
+++ b/src/index.js
@@ -16,3 +16,5 @@ ExampleComponent.defaultProps = {
 };

 export default ExampleComponent;
+
+export * from './AnotherComponent';
diff --git a/src/stories/1-Button.stories.js b/src/stories/1-Button.stories.js
index 1704845..3787181 100644
--- a/src/stories/1-Button.stories.js
+++ b/src/stories/1-Button.stories.js
@@ -2,7 +2,7 @@ import React from 'react';
 import { action } from '@storybook/addon-actions';
 import { Button } from '@storybook/react/demo';

-import ExampleComponent from '../';
+import ExampleComponent, { AnotherComponent } from '../';

 export default {
   title: 'Example Component',
@@ -11,6 +11,8 @@ export default {

 export const Text = () => <ExampleComponent text='Hello, world!' />;

+export const ShowAnother = () => <AnotherComponent />;
+
```

### Add Jest tests for components

#### Add enzyme test library

```sh
yarn add -D enzyme enzyme-adapter-react-16
```

#### Add src/setupTests.js

```js
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
```

#### Add src/AnotherComponent.test.js

```js
import React from 'react';
import { mount } from 'enzyme';
import { AnotherComponent } from '.';

describe('AnotherComponent', () => {
  it('shows correct text', () => {
    const wrapper = mount(<AnotherComponent />);
    expect(wrapper.text()).toEqual('Hello from another component!');
  });
});
```

#### Update index.test.js

```diff
diff --git a/components/src/index.test.js b/components/src/index.test.js
index a0f0449..9abe687 100644
--- a/components/src/index.test.js
+++ b/components/src/index.test.js
@@ -1,7 +1,10 @@
-import { ExampleComponent } from '.'
+import React from 'react';
+import { mount } from 'enzyme';
+import { ExampleComponent } from '.';

 describe('ExampleComponent', () => {
-  it('is truthy', () => {
-    expect(ExampleComponent).toBeTruthy()
-  })
-})
+  it('shows correct text', () => {
+    const wrapper = mount(<ExampleComponent text='Hello, world!' />);
+    expect(wrapper.text()).toEqual('Example Component: Hello, world!');
+  });
+});
```

### Run Just tests

```sh
$ yarn test
yarn run v1.22.4
$ run-s test:unit test:lint test:build
$ cross-env CI=1 react-scripts test --env=jsdom
PASS src/AnotherComponent.test.js
PASS src/index.test.js

Test Suites: 2 passed, 2 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        1.06s
Ran all test suites.
```

### Show Jest test results in Storybook

```sh
yarn add -D storybook-addon-specifications
```

#### Register Specifications addon

> Also removes un-used addons Actions and Links (optional;)
>
> Removing 'Actions' ensures that the 'Specifications' tab
> shows up by default when viewing a Story on the Canvas.

```diff
diff --git a/components/.storybook/main.js b/components/.storybook/main.js
index 5f60ae0..8f46833 100644
--- a/components/.storybook/main.js
+++ b/components/.storybook/main.js
@@ -2,8 +2,7 @@ module.exports = {
   stories: ['../src/**/*.stories.js'],
   addons: [
     '@storybook/preset-create-react-app',
-    '@storybook/addon-actions',
-    '@storybook/addon-links',
-    '@storybook/addon-docs'
+    '@storybook/addon-docs',
+    'storybook-addon-specifications'
   ]
-}
+};;
```

#### Export describe() block from tests

```diff
diff --git a/components/src/index.test.js b/components/src/index.test.js
index 9abe687..9997a70 100644
--- a/components/src/index.test.js
+++ b/components/src/index.test.js
@@ -2,9 +2,11 @@ import React from 'react';
 import { mount } from 'enzyme';
 import { ExampleComponent } from '.';

-describe('ExampleComponent', () => {
+const specs = describe('ExampleComponent', () => {
   it('shows correct text', () => {
     const wrapper = mount(<ExampleComponent text='Hello, world!' />);
     expect(wrapper.text()).toEqual('Example Component: Hello, world!');
   });
 });
+
+export default specs;
```

#### Import specs from test file and call with specs()

```diff
diff --git a/components/src/stories/1-Button.stories.js b/components/src/stories/1-Button.stories.js
index 3787181..ed97b64 100644
--- a/components/src/stories/1-Button.stories.js
+++ b/components/src/stories/1-Button.stories.js
@@ -1,15 +1,20 @@
 import React from 'react';
 import { action } from '@storybook/addon-actions';
 import { Button } from '@storybook/react/demo';
+import { specs } from 'storybook-addon-specifications';

 import ExampleComponent, { AnotherComponent } from '../';
+import exampleComponentSpecs from '../index.test';

 export default {
   title: 'Example Component',
   component: ExampleComponent
 };

-export const Text = () => <ExampleComponent text='Hello, world!' />;
+export const Text = () => {
+  specs(() => exampleComponentSpecs);
+  return <ExampleComponent text='Hello, world!' />;
+};
```

#### Add .storybook/test.js

```js
import { describe, it, beforeEach } from 'storybook-addon-specifications';
import expect from 'expect';

import { configure as enzymeConfigure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzymeConfigure({ adapter: new Adapter() });

window.describe = describe;
window.beforeEach = beforeEach;
window.it = it;
window.expect = expect;
```

#### Add .storybook/config.js

> TODO: figure out how to not have both a main.js and a config.js

```js
import { configure } from '@storybook/react';
import './test';
configure(require.context('../src/stories', true, /\.stories\.js$/), module);
```

### Add Flow

```sh
yarn add flow-bin
```

#### Add flow to package.json

```diff
diff --git a/components/package.json b/components/package.json
index 5bd8527..3dc3e97 100644
--- a/components/package.json
+++ b/components/package.json
@@ -23,7 +23,8 @@
     "predeploy": "cd example && yarn install && yarn run build",
     "deploy": "gh-pages -d example/build",
     "storybook": "start-storybook -p 9009",
-    "build-storybook": "build-storybook"
+    "build-storybook": "build-storybook",
+    "flow": "flow"
```

#### Initialize (add .flowconfig)

```sh
yarn flow init
```

#### Add @flow to files

```js
// @flow strict
```

> `strict` is optional

#### Add jest flow types

```sh
npm install -g flow-typed

# Get jest version number
grep ^jest@ yarn.lock

# Install flow types for jest
flow-typed install jest@24.9.0
```

#### Add flow-types to .flowconfig

```diff
diff --git a/components/.flowconfig b/components/.flowconfig
index 1fed445..0d26140 100644
--- a/components/.flowconfig
+++ b/components/.flowconfig
@@ -3,6 +3,7 @@
 [include]

 [libs]
+flow-typed
```

#### And add jest note to .eslintrc

```diff
diff --git a/components/.eslintrc b/components/.eslintrc
index 530000c..6a09bdb 100644
--- a/components/.eslintrc
+++ b/components/.eslintrc
@@ -8,7 +8,8 @@
     "prettier/react"
   ],
   "env": {
-    "node": true
+    "node": true,
+    "jest": true
   },
```

That's it!

_**Flow-typed component library with property documentation and Storybook-integrated test UI!**_

> Note: with this setup, you cannot:  
> `import AnotherComponent from 'todo-components/AnotherComponent`

</details>

---

## Create React Application

`TODO`
