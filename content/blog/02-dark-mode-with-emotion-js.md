---
title: 'adding dark mode to your gatsby site with emotion js'
author: 'alex christie'
date: '2019-03-23T13:00:00-06:00'
type: 'code'
tags: ['gatsby', 'coding', 'react', 'themes', 'dark mode']
excerpt: 'adding dark mode and a toggle using emotion'
draft: false
---
In finalizing the current version of my [portfolio](/portfolio), I wanted to offer a dark mode toggle as a proof of concept, practice working with [emotion.js](https://emotion.sh/docs/introduction), and just for usability because my blog and portfolio are so light. To implement this, I utilize a toggle component to control state, `emotion.js`'s `<Global />` styles to inject some styles at `:root`, and browser supported variables to change everything from font color to backgrounds to link colors.

### Set Up

Big picture things you'll need to do:

1. Add state to your parent component/container
2. Pass state down to a `ThemeToggle` and `ThemeWrapper`
3. Use `emotion.js` to pass themes into `:root` in the `ThemeWrapper` component

I'm assuming you have [Gatsby.js](https://www.gatsbyjs.org/docs/quick-start) and have [emotion installed](https://www.gatsbyjs.org/docs/emotion/.). I'm also using browser variables to style text and background colors. You can read an excellent write up on theming with variables at [CSS Tricks](https://css-tricks.com/theming-with-variables-globals-and-locals/).

### Adding State

I built my portfolio as a standalone component, so I'm just adding state to the upper most component:

``` javascript
class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dark: false
    };
    this.toggleTheme = this.toggleTheme.bind(this);
  }
  componentWillUnmount() {
    this.setState({ dark: false });
  }
  toggleTheme() {
    this.setState({ dark: !this.state.dark });
  }

  render() {
    return (
      <Wrapper>
        <ThemeWrapper
          dark={this.state.dark} />
        <Header>
          {...}
          <ThemeToggle
          toggleTheme={this.toggleTheme}
          dark={this.state.dark} />
        </Header>
        {...}
      </Wrapper>
    );
  }
```

Here, I'm initializing `this.state.dark` to false and binding a toggle function to state. I'm using `componentWillUnmount()` in case someone moves away from the portfolio to the rest of the site (which isn't set up for dark mode yet), and then using `toggleTheme()` to set dark to `true` or `false`. I'm passing state into `ThemeWrapper` as a prop so it knows whether or not to return our darkUI. Because `ThemeWrapper` is going to change `:root` level variables, we don't need to wrap the rest of the page in it, but keeping it near the top of the component makes it syntactically clear what it's for. I'm also passing our `toggleTheme()` function and state into the `ThemeToggle` component so we can visually render what state is set to.

### Theme Wrapper and Themes

Before we build our `ThemeWrapper`, we need to have a javascript file with our themes. I wrote a module that exports two themes--lightUI and darkUI. lightUI repeats the variables I have in my `global.css` and functions as a fallback. darkUI repeats these variables with new colors:

``` javascript
  const lightUI = {
    textColor: `#333`,
    {...}
    backgroundColor: `#fcfcfc`,
  }

  const darkUI = {
    textColor: `#fcfcfc`,
    {...}
    backgroundColor: `#333`,
  }

  module.exports = {
    lightUI: lightUI,
    darkUI: darkUI
  }
```

`ThemeWrapper` takes these themes and uses `emotion.js`'s global styles to inject our theme at the `:root` level:

``` javascript
import React from 'react';
import { Global, css } from '@emotion/core'

import { darkUI, lightUI } from './styles/themes'

const ThemeWrapper = props => {
  const { dark } = props;

  return (
    <Global
      styles={css`
        :root {
          --textColor: ${dark ? darkUI.textColor : lightUI.textColor};
          --backgroundColor: ${dark ? darkUI.backgroundColor : lightUI.backgroundColor};
        }
      `}
    />
  );
};

export default ThemeWrapper;
```

Here, we're importing `Global` and `css` from `@emotion/core` as well as our themes. We've passed state into our `ThemeWrapper` as a prop that's either true or false. We return a `Global` component with a style that initializes, at `root:`, our variables. We then use a ternary operator to return the associated variable depending on whether dark is set to true or false. You can read more about `Global` [here](https://emotion.sh/docs/globals).

### Theme Toggle

So far we've set up state, written some themes, and a component that will render our theme based on state. The last thing to do is provide a toggle that users can actually press to change the theme.

``` javascript
import React from 'react';

const ThemeToggle = props => {

  const { toggleTheme, dark } = props;

  return (
    <button onClick={toggleTheme}>
      {dark
        ? `light`
        : `dark`}
    </button>
  );
}

export default ThemeToggle;
```

Remember that we've passed our `toggleTheme()` function and state into this component. So we're returning a button that, when clicked, toggles state and, based on the state, toggles the words `light` and `dark`. This is a very minimal implementation--you could add a sun and moon icon to signify the same thing.

### Wrapping Up and Further Thinking

You can check out my implementation [here](https://www.inadequatefutures.com/portfolio/) and the source code on [GitHub](https://github.com/inadeqtfuturs/if/tree/master/src/components/portfolio). There's more thinking to be done here about translating variables from dark to light UI. For example, the slider navigation could be tweaked a bit more for better contrast in dark mode, but this would require renaming or adding variables. As I note above, we could also simplify state by using hooks, but that might be for another weekend.

If you have different, better, or slicker implementation, I'd love to hear about it on [twitter](https://twitter.com/inadeqt_futurs) or via email (alexj [dot] christie [at] gmail [dot] com).
