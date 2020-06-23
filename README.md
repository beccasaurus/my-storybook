# 📘 My Storybook Template

> _Flow-typed React component library and application with Jest tests and Storybook_

My currently preferred template for creating React apps.

Includes examples of a variety of things:

- Flow
- React
- Storybook
- Jest/Enzyme
- React Application
- Shared Component Library

I use these lovely tools:

- Create React Application (CRA)
- Create React Library (CRL)

## Getting started

Follow the steps below to create from scratch:

```sh
mkdir todo-app && cd todo-app/
```

## Create Component Libary (optional)

### Create component library

```sh
npx create-react-library todo-components

mv todo-components/ components && cd components/
```

### Add Storybook

<details>
  <summary></summary>

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

</details>

### Add Jest

<details>
  <summary></summary>

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

### Run Jest tests

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

#### Import specs from story and call with specs()

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

</details>

### Add Flow

<details>
  <summary></summary>

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

</details>

### Misc

<details>
  <summary></summary>

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

</details>

> Note: with this setup, you cannot:
>
> `import SomeComponent from 'todo-components/SomeComponent`;

> To import additional components (besides default export):
>
> `import TodoComponent, { SomeComponent } from 'todo-components`;

---

## Create React Application

```sh
# Run this _outside_ of your git repository
npx create-react-app todo-app

rm -rf todo-app/.git

mv todo-app my-storybook/app/ && cd my-storybook/app/
```

### Add Storybook

<details>
  <summary></summary>

```sh
npx -p @storybook/cli sb init

yarn add -D @storybook/addon-docs
```

```diff
diff --git a/.storybook/main.js b/.storybook/main.js
index 8f79d46..68c437d 100644
--- a/.storybook/main.js
+++ b/.storybook/main.js
@@ -4,5 +4,6 @@ module.exports = {
     '@storybook/preset-create-react-app',
     '@storybook/addon-actions',
     '@storybook/addon-links',
+    '@storybook/addon-docs',
   ],
 }
```

#### Add a component with a story

```diff
diff --git a/src/components/MyComponent.js b/src/components/MyComponent.js
index e69de29..4673fc7 100644
--- a/src/components/MyComponent.js
+++ b/src/components/MyComponent.js
@@ -0,0 +1,19 @@
+import React from 'react';
+
+type Props = {
+  /** My text property */
+  text: string,
+};
+
+/** My amazing component */
+export function MyComponent({ text }: Props) {
+  // Random reminder, if you return a string instead of JSX
+  // then Storybook will not show your props! Weird bug.
+  return <p>Hello there! And also "{text}"</p>;
+}
+
+MyComponent.defaultProps = {
+  text: 'Defaul text',
+};
+
+export default MyComponent;
diff --git a/src/stories/MyComponent.stories.js b/src/stories/MyComponent.stories.js
index e69de29..a71531b 100644
--- a/src/stories/MyComponent.stories.js
+++ b/src/stories/MyComponent.stories.js
@@ -0,0 +1,9 @@
+import React from 'react';
+import MyComponent from '../components/MyComponent';
+
+export default {
+  title: 'My Component',
+  component: MyComponent,
+};
+
+export const Hello = () => <MyComponent text="Hello, world!" />;
```

</details>

### Add Jest

<details>
  <summary></summary>

#### Add enzyme test library

```sh
yarn add -D enzyme enzyme-adapter-react-16
```

#### Update src/setupTests.js

```diff
diff --git a/src/setupTests.js b/src/setupTests.js
index 74b1a27..6c4d92b 100644
--- a/src/setupTests.js
+++ b/src/setupTests.js
@@ -3,3 +3,6 @@
 // expect(element).toHaveTextContent(/react/i)
 // learn more: https://github.com/testing-library/jest-dom
 import '@testing-library/jest-dom/extend-expect';
+import Enzyme from 'enzyme';
+import Adapter from 'enzyme-adapter-react-16';
+Enzyme.configure({ adapter: new Adapter() });
```

#### Add a test for MyComponent

```diff
diff --git a/src/components/MyComponent.test.js b/src/components/MyComponent.test.js
index e69de29..66fb934 100644
--- a/src/components/MyComponent.test.js
+++ b/src/components/MyComponent.test.js
@@ -0,0 +1,10 @@
+import React from 'react';
+import { mount } from 'enzyme';
+import MyComponent from './MyComponent';
+
+describe('MyComponent', () => {
+  it('shows correct text', () => {
+    const wrapper = mount(<MyComponent />);
+    expect(wrapper.text()).toEqual('Hello there! And also "Defaul text"');
+  });
+});
```

#### Run Jest test

```sh
$ yarn test

 PASS  src/components/MyComponent.test.js
  MyComponent
    ✓ shows correct text (25ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.547s, estimated 2s
Ran all test suites related to changed files.
```

#### Show Jest tests in Storybook

```sh
yarn add -D storybook-addon-specifications
```

#### Register Specifications addon

> Also removes un-used addons Actions and Links (optional;)
>
> Removing 'Actions' ensures that the 'Specifications' tab
> shows up by default when viewing a Story on the Canvas.

```diff
diff --git a/app/.storybook/main.js b/app/.storybook/main.js
index 68c437d..e2b6c0b 100644
--- a/app/.storybook/main.js
+++ b/app/.storybook/main.js
@@ -2,8 +2,7 @@ module.exports = {
   stories: ['../src/**/*.stories.js'],
   addons: [
     '@storybook/preset-create-react-app',
-    '@storybook/addon-actions',
-    '@storybook/addon-links',
     '@storybook/addon-docs',
+    'storybook-addon-specifications',
   ],
 };
```

#### Export describe() block from tests

```diff
diff --git a/app/src/components/MyComponent.test.js b/app/src/components/MyComponent.test.js
index 66fb934..83ca251 100644
--- a/app/src/components/MyComponent.test.js
+++ b/app/src/components/MyComponent.test.js
@@ -2,9 +2,11 @@ import React from 'react';
 import { mount } from 'enzyme';
 import MyComponent from './MyComponent';

-describe('MyComponent', () => {
+const specs = describe('MyComponent', () => {
   it('shows correct text', () => {
     const wrapper = mount(<MyComponent />);
     expect(wrapper.text()).toEqual('Hello there! And also "Defaul text"');
   });
 });
+
+export default specs;
```

#### Import specs from story file and call with specs()

```diff
diff --git a/app/src/stories/MyComponent.stories.js b/app/src/stories/MyComponent.stories.js
index a71531b..d8fb14f 100644
--- a/app/src/stories/MyComponent.stories.js
+++ b/app/src/stories/MyComponent.stories.js
@@ -1,9 +1,14 @@
 import React from 'react';
 import MyComponent from '../components/MyComponent';
+import { specs } from 'storybook-addon-specifications';
+import myComponentSpecs from '../components/MyComponent.test';

 export default {
   title: 'My Component',
   component: MyComponent,
 };

-export const Hello = () => <MyComponent text="Hello, world!" />;
+export const Hello = () => {
+  specs(() => myComponentSpecs);
+  return <MyComponent text="Hello, world!" />;
+};
```

#### Add .storybook/test.js

```diff
diff --git a/app/.storybook/test.js b/app/.storybook/test.js
index e69de29..adc3a5e 100644
--- a/app/.storybook/test.js
+++ b/app/.storybook/test.js
@@ -0,0 +1,11 @@
+import { describe, it, beforeEach } from 'storybook-addon-specifications';
+import expect from 'expect';
+
+import { configure as enzymeConfigure } from 'enzyme';
+import Adapter from 'enzyme-adapter-react-16';
+enzymeConfigure({ adapter: new Adapter() });
+
+window.describe = describe;
+window.beforeEach = beforeEach;
+window.it = it;
+window.expect = expect;
```

#### Add .storybook/config.js

> TODO: figure out how to not have both a main.js and a config.js

```diff
diff --git a/app/.storybook/config.js b/app/.storybook/config.js
index e69de29..cf480e3 100644
--- a/app/.storybook/config.js
+++ b/app/.storybook/config.js
@@ -0,0 +1,3 @@
+import { configure } from '@storybook/react';
+import './test';
+configure(require.context('../src/stories', true, /\.stories\.js$/), module);
```

</details>

### Add Flow

<details>
  <summary></summary>

```sh
yarn add flow-bin
```

#### Add flow to package.json

```diff
diff --git a/app/package.json b/app/package.json
index c73a164..1b5a9e1 100644
--- a/app/package.json
+++ b/app/package.json
@@ -6,6 +6,7 @@
     "@testing-library/jest-dom": "^4.2.4",
     "@testing-library/react": "^9.3.2",
     "@testing-library/user-event": "^7.1.2",
+    "flow-bin": "^0.127.0",
     "react": "^16.13.1",
     "react-dom": "^16.13.1",
     "react-scripts": "3.4.1"
@@ -16,7 +17,8 @@
     "test": "react-scripts test",
     "eject": "react-scripts eject",
     "storybook": "start-storybook -p 9009 -s public",
-    "build-storybook": "build-storybook -s public"
+    "build-storybook": "build-storybook -s public",
+    "flow": "flow"
   },
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
diff --git a/app/.flowconfig b/app/.flowconfig
index 1fed445..0d26140 100644
--- a/app/.flowconfig
+++ b/app/.flowconfig
@@ -3,6 +3,7 @@
 [include]

 [libs]
+flow-typed
```

</details>

### Add Component from Component Library (optional)

<details>
  <summary></summary>

</details>
