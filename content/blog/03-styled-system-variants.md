---
title: 'styled system, variants, overrides'
author: 'alex christie'
date: '2020-06-28T14:32:50-06:00'
type: 'code'
tags: ['styled system', 'variants', 'override', 'styled components', 'design system']
excerpt: 'creating and overriding variants in styled system'
draft: false
---
[Styled System](https://styled-system.com/) offers some robust tools to build out a themeable component library based on design tokens simply by using a unified theme object. In this post, I want to think about how to set up reusable component variants -- components that are functionally the same but visually different -- and how to override these default values when necessary.

### styled system and design tokens

One reason to use something like Styled System is an adherence to design tokens. A design token is a value that's used to construct components. It can be a color (primary, secondary, light), a size (small, medium, large), or an array of values for spacing (2px, 4px, 8px, etc.). Using design tokens makes building out a component library or design system easy and consistent because it reduces the number of variables you _could_ use (an infinite number) to a limited set that you _can_ use. This constraint leads to consistency in design.

Styled System, and other packages floating in this ecosystem, use a [theme spec](https://system-ui.com/theme/) for consistency across projects. It's just an object with values that can be used to build out components.

```js
theme = {
  colors: {
    text: '#f7f7f7',
    background: '#464452',
    primary: '#28B4AD',
    secondary: '#4926F6'
  },
  space: [0, 0.25, 0.5, 1, 2, 4, 8]
}
```

We can grab our hex values from the `theme.colors` object, or use the `theme.space` array to get a `rem` value for defining padding or margin.

With these values, it's easy enough to go out and build a simple component by importing the theme object. But we can also use [Styled Component's Theme Provider](https://styled-components.com/docs/advanced#theming) to give use access to these variables within our styled components

```js
import React from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
import theme from './theme';

const StyledButton = styled.button`
  ${({ theme }) => css`
    background-color: ${theme.colors.primary};
    padding: ${theme.space[2]}rem ${theme.space[3]}rem;
  `}
`;

function Button() {
  return (
    <ThemeProvider theme={theme}>
      <StyledButton>Styled</StyledButton>
    </ThemeProvider>
  )
}
```

In a real world use case, you'd hoist the `ThemeProvider` up to whatever the app's entry point is, allowing all styled components access to the theme variables. This eliminates the need to import the theme object into every component and allows for on the fly theme switching based on what you pass to the `ThemeProvider`.

### building a variant

Buttons ask us to think in variants. The difference between a submit and a cancel button on a form is largely about design rather than functionality. What I ultimately want is to be able to abstract that visual difference away by just passing a prop to change the color.

```js
<Button>Submit</Button>
<Button type='outline' color='secondary'>Cancel</Button>
```

Styled System has a built in [variant function](https://styled-system.com/variants/) that makes this abstraction really easy. Here's an example:

```js
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { variant } from 'styled-system';
import { alpha, darken } from '@theme-ui/color';

const StyledButton = styled.button`
  ${({ theme, color }) =>
    variant({
      prop: 'type',
      variants: {
        default {
          color: 'background',
          bg: color,
          '&:hover': {
            bg: darken(color, theme.opacity.hover)
          }
        },
        outline: {
          color,
          border: `${theme.borders[1]} ${theme.colors[color]}`,
          bg: 'transparent',
          '&:hover': {
            bg: alpha(color, 0.1)
          }
        }
      }
    })
  }
`;

function Button({ children, color, type, ...props }) {
  return (
    <StyledButton
      color={color}
      type={type}
      {...props}
    >
      {children}
    <StyledButton>
  );
}

Button.propTypes = {
  /**
   * content of button
   */
  children: PropTypes.string,
  /**
   * takes one of 'primary', 'secondary', 'accent', 'muted'. corresponds
   * to theme colors
   */
  color: PropTypes.oneOf(['primary', 'secondary', 'accent', 'muted']),
  /**
   * takes one of 'default', 'outline'
   */
  type: PropTypes.oneOf(['default', 'outline'])
}

Button.defaultProps = {
  children: null,
  color: 'primary',
  type: 'default'
};

export default Button;

```

At the top of the styled component, we're deconstructing the `props` object to get access to the `theme` that is passed down from `ThemeProvider` and the button's props, specifically `color`. We then use the `variant` function by providing a prop string of 'type', so they styling will depend on the `type` we pass to the button. These are two basic examples, and your milage may vary, but `type` will determine the text color, the background color, and how to handle the hover state. In both cases, we use the button's color prop to determine which color variable to use for the different css properties.

Because our color variables line up with the variables in our theme object, the `variant` function takes care of assigning the variables for us. With the outline variant, we can even use `color` as a shorthand for explicitly defining `color: color`. This eliminates additional theme destructuring, taking the color prop and finding the corresponding value in the theme object, which we have to do for the outline's border.

### overriding a variant

At some point, you're going to want to override these variants -- the design might call for it or you need something like a one-off CTA button. Without a token in the theme object that matches what you need, you'll need a little more granular control over how to style the thing. In this example, we can pass props into the styled button and override default values by using a styled component. The above button could be overridden like this:

```js
const RedButton = styled.Button`
  color: red;
`;

function Page() {
  return (
    <RedButton>I'm red now</RedButton>
  );
}
```

Rather than getting a button with the default `primary` color, we'll get a red button. This is a basic example, but you could use the same principle to do more complicated overrides.

### further thinking

In general, I like this pattern/system because it's, on the one hand, rigid and tied to the design tokens and, on the other, extendable beyond those values if you're in a pinch. Continuing to work some of this out for an in-house design system, my next thoughts would be about extending the above -- what other props would I want the component to take? What other states would be useful here? Additionally, I want to think about what other helper or getting functions might make defining css properties that aren't explicitly in the theme object -- what's the best way to programmatically generate borders or box shadows? The color functions I'm using could be extended to do more, but there are surely other ways to make syntax a little legible and friendlier.

An additional problem to consider is what overriding values this way gets you beyond an easy one-off: this won't generate a new hover state -- I'd have to do that myself. What becomes important, I think, is thinking about the theming system a bit more holistically or systemically in the way I'm asking in the questions above.

### further reading

- [styled system props](https://github.com/styled-system/styled-system/blob/master/docs/table.md#core)
- [chakra ui](https://chakra-ui.com/style-props)
- [primer](https://primer.style/components/system-props)
- [sprout social](https://seeds.sproutsocial.com/components/system-props)
- [design tokens](https://www.erikverweij.dev/blog/manage-design-tokens-with-typescript-and-styled-components/)
