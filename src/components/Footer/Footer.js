import React from 'react';
import { styled } from '@stitches';
import Link from 'next/link';

const FooterWrapper = styled('footer', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '$6 0'
});

const Nav = styled('nav', {});
const NavList = styled('ul', {
  display: 'flex',
  gap: '$2',
  listStyle: 'none',
  padding: 0
});
const NavListItem = styled('li', {
  color: '$text',
  fontSize: '$sm',
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
  borderRadius: '8px',
  transition: 'background 0.3s',
  '&:hover, &:focus': {
    background: 'rgba(0,0,0,0.05)'
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
