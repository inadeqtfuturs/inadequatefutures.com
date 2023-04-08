import React from 'react';
import { styled } from '@stitches';
import Link from 'next/link';

const Brand = styled('a', {
  width: '48px',
  height: '48px',
  margin: 0,
  borderRadius: '100px',
  border: '2px solid $text',
  background: 'url("https://source.boringavatars.com/marble/120/?colors=b7e2d8,b7e2d8,fdfdfd") center',
  overflow: 'hidden',
  '&::after': {
    content: '',
    width: '48px',
    height: '48px',
    display: 'block',
    background: 'url("https://source.boringavatars.com/marble/120/?colors=fdfdfd,b7e2d8,fdfdfd") center',
    opacity: 0,
    transition: 'opacity 0.6s'
  },
  '&:hover, &:focus': {
    '&::after': {
      opacity: 1
    }
  }
});

const HeaderWrapper = styled('header', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '$4 0 $2'
});

const Nav = styled('nav', {});

const InnerLink = styled('a', {
  textDecoration: 'none',
  padding: '$1 $2',
  marginRight: '$2',
  borderRadius: '8px',
  color: '$text',
  transition: 'background 0.3s',
  '&:last-child': {
    margin: 0
  },
  '&:hover, &:focus': {
    background: 'rgba(0,0,0,0.05)'
  }
});

const menuItems = [
  { href: '/garden', label: 'garden' },
  { href: '/work', label: 'work' },
  { href: '/about', label: 'about' },
];

function Header() {
  return (
    <HeaderWrapper>
      <Link href="/" passHref>
        <Brand aria-label="home" />
      </Link>
      <Nav>
        {menuItems.map(({ href, label }) => (
          <Link href={href} passHref key={href}>
            <InnerLink>{label}</InnerLink>
          </Link>
        ))}
      </Nav>
    </HeaderWrapper>
  );
}

export default Header;
