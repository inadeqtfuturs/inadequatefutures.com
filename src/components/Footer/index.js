import React from 'react';
import { styled, darkTheme } from '@stitches';
import Link from 'next/link';

const FooterWrapper = styled('footer', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '$6 0',
  [`.${darkTheme} &`]: {
    '@sm': {
      borderTop: '$contentBorder',
    },
    padding: 0
  }
});

const Nav = styled('nav', {});
const NavList = styled('ul', {
  display: 'flex',
  gap: '$2',
  listStyle: 'none',
  padding: 0,
  background: '$containerBackground',
  borderRight: '$contentBorder',
  [`.${darkTheme} &`]: {
    margin: 0,
    gap: '$gutter'
  }
});
const NavListItem = styled('li', {
  color: '$text',
  fontSize: '$sm',
  background: '$background',
  '&::after': {
    content: '/',
    display: 'inline',
    marginLeft: '$2',
    opacity: 0.5
  },
  '&:last-child': {
    margin: 0,
    '&::after': {
      content: ''
    }
  },
  [`.${darkTheme} &`]: {
    padding: '$4',
    '&::after': {
      content: 'none',
    }
  }
});

const InnerLink = styled('a', {
  textDecoration: 'none',
  transition: 'opacity 0.3s',
  opacity: '0.75',
  '&:hover, &:focus': {
    opacity: 1
  }
});

const GardenLink = styled('a', {
  textDecoration: 'none',
  padding: '$1 $2',
  borderRadius: '$md',
  transition: 'background 0.3s',
  '&:hover, &:focus': {
    background: 'rgba(0,0,0,0.05)'
  },

  [`.${darkTheme} &`]: {
    margin: 0,
    borderLeft: '$contentBorder',
    padding: '$4'
  }
});

const menuItems = [
  { href: 'https://github.com/inadeqtfuturs', label: 'github' },
  { href: 'https://twitter.com/speculative_dev', label: 'twitter' },
  { href: 'https://www.polywork.com/inadeqt_futurs', label: 'polywork' }
];

function Footer() {
  return (
    <FooterWrapper>
      <Nav>
        <NavList>
          {menuItems.map(({ href, label }) => (
            <NavListItem key={href}>
              <Link href={href} passHref>
                <InnerLink>{label}</InnerLink>
              </Link>
            </NavListItem>
          ))}
        </NavList>
      </Nav>
      <GardenLink href="https://digital-garden.dev">
        <span role="img" aria-label="seedling">🌱</span>
      </GardenLink>
    </FooterWrapper>
  );
}

export default Footer;
