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

### Create Component Libary (optional)

#### Create component library

```sh
npx create-react-library todo-components

mv todo-components/ components && cd components/
```

#### Update .prettierrc to use semicolons

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

#### Add Storybook

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

#### Update Storybook to show library component

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

#### Add documentation to library component

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

#### Add a default export for component library (optional)

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

#### Add a second component to the library (optional)

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

#### Add Jest tests for components

```sh
yarn add -D enzyme enzyme-adapter-react-16
```

##### Add src/setupTests.js

```js
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
```

##### Add src/AnotherComponent.test.js

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

##### Update index.test.js

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

#### Run Just tests

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

#### Show Jest test results in Storybook

- TODO

#### Add Flow

- TODO

That's it!

> Note: with this setup, you cannot:  
> `import AnotherComponent from 'todo-components/AnotherComponent`

### Create React Application

`TODO`
