---
title: 'tangle frontend'
author: 'alex christie'
date: '2020-05-25T15:43:56-06:00'
type: 'garden'
tags: ['nextjs', 'styled system', 'theme-ui', 'component library', 'monorepo', 'full stack']
excerpt: 'this post documents setting up the frontend portion of tangle'
draft: false
---

this post documents setting up the frontend portion of tangle.

This section covers the technical foundations including

- bootstrapping the lerna repo
- adding eslint and prettier
- setting up the frontend

### bootstrap lerna repo

``` bash
yarn init
yarn add lerna --dev
yarn lerna init
```

Add to package.json:

``` js
...
  'name': 'root',
  'private': true,
  'workspaces': [
    'packages/*'
  ]
...
```

Update lerna.json:

``` js
  'packages': ['packages/*'],
  'version': 'independent',
  'npmClient': 'yarn',
  'useWorkspaces': true
```

### gitignore

### eslint/prettier

Copy/paste eslint and prettier

``` bash
  yarn add babel-eslint eslint eslint-config-airbnb
  eslint-config-prettier eslint-plugin-import
  eslint-plugin-jsx-a11y eslint-plugin-prettier
  eslint-plugin-react prettier -W -D
```

`-W` for root flag

`-D` for dev dependencies

Add to package.json

``` js
    'lint': 'eslint --fix . && echo 'Lint complete.'',
```

Commit `[init]`.

## frontend / next.js

``` bash
  mkdir packages/web
  npx create-next-app packages/web
```

Select `Default starter app`

Update name of web app to `@tangle/web`

Add command to root package.json

```'web': 'lerna run --scope @tangle/web dev --stream'```

commit `[web] init`

We want to share react and next across the codebase. Add these as `devDependencies` to the root and add them as `peerDependencies` in whatever packages need them.

## component library

``` bash
  mkdir packages/components
  cd packages/components && yarn init -y
```

Name package `@tangle/components`.

Add peer dependencies

```js
  yarn workspace @tangle/components add -P react react-dom next
```

Add dependencies

```js
  yarn workspace @tangle/components add @emotion/styled @theme-ui/color styled-system theme-ui prop-types
```

Make a component

`packages/components/src/components/Button/Button.js`

``` js
  import React from 'react';
  import PropTypes from 'prop-types';
  import styled from '@emotion/styled';

  const StyledButton = styled.button`
    color: red;
    background-color: blue;
  `;

  function Button({ children }) {
    return <StyledButton>{children}</StyledButton>;
  }

  Button.propTypes = {
    /**
    * content of button
    */
    children: PropTypes.string
  };

  Button.defaultProps = {
    children: null
  };

  export default Button;

```

Add storybook

``` bash
  yarn add -W -D @storybook/react @storybook/addon-actions
  @storybook/addon-docs babel-loader @babel/core
```

Add `.storybook` directory w/ `config.js` and `main.js`

`config.js`

``` js
  import { configure, addDecorator } from '@storybook/react';

  addDecorator(storyFn => (storyFn()))

  configure(require.context('../packages/components/src', true, /\.stories\.js$/), module);
```

`main.js`

``` js
  module.exports = {
    stories: ['../packages/**/*.stories.js'],
    addons: ['@storybook/addon-docs']
  };
```

Add a story for the button

`Button.stories.js`

``` js
  import React from 'react';
  import { action } from '@storybook/addon-actions';
  import { storiesOf } from '@storybook/react';
  import Button from './Button';

  storiesOf('Button', module).add('default', () => (
    <Button onClick={action('clicked')}>test</Button>
  ));
```

update root `package.json`

``` js
  'stories': 'start-storybook'
```

Run storybook.

## clean up and code share

[babel-plugin-module-resolver](https://www.npmjs.com/package/babel-plugin-module-resolver) helps us keep things looking clean.

``` bash
  yarn add -D -W babel-plugin-module-resolver eslint-plugin-import
  eslint-import-resolver-babel-module eslint-import-resolver-alias
```

add a `.babelrc` file

``` js
  {
    'plugins': [
      ['module-resolver', {
        'root': ['./'],
        'alias': {
          '@components': './packages/components/src',
          '@web': './packages/web'
        }
      }]
    ]
  }
```

add to `.eslintrc.js`

``` js
  settings: {
    'import/resolver': {
      'babel-module': {},
      alias: {
        map: [['@components', './packages/components/src']],
        extensions: ['.ts', '.js', '.jsx', '.json']
      }
    }
  }
```

add an `index.js` file to `components/src` and export the button component from there. Update the import in the `Button.stories.js` file to reflect the update

``` js
  import { Button } from '@components';
```

Run storybook to test.

Time to add the button to Next.js

Add a `babel.config.js` to the next app

``` js
  module.exports = {
    babelrcRoots: ['../packages/*'],
    presets: ['next/babel'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@components': '../components/src'
          }
        }
      ]
    ]
  };
```

We need to transpile the components as they come in:

`yarn workspaces @tangle/web next-transpile-modules`

Transpile components in the `next.config.js`

``` js
  const withTM = require('next-transpile-modules')([
    '../components/src'
  ]);

  module.exports = withTM();
```

Call the `Button` in your index to test. Run your next app.
