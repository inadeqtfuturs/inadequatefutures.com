import React from 'react';
import { styled, darkTheme } from '@stitches';
import Link from 'next/link';


const Brand = styled('a', {
  height: '$brand',
  aspectRatio: '1 / 1',
  margin: 0,
  borderRadius: '$xl',
  border: '$brand-border',
  background: 'url("https://source.boringavatars.com/marble/120/?colors=b7e2d8,b7e2d8,fdfdfd") center',
  overflow: 'hidden',
  '&::after': {
    content: '',
    width: '$brand',
    height: '$brand',
    display: 'block',
    background: 'url("https://source.boringavatars.com/marble/120/?colors=fdfdfd,b7e2d8,fdfdfd") center',
    opacity: 0,
    transition: 'opacity 0.6s'
  },
  '&:hover, &:focus': {
    '&::after': {
      opacity: 1
    }
  },
  [`.${darkTheme} &`]: {
    borderTop: 'none',
    borderBottom: 'none',
    borderLeft: 'none'
  }
});

const HeaderWrapper = styled('header', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '$header',
  borderBottom: '$contentBorder',
});

const Nav = styled('nav', {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '$gutter',
  background: '$containerBackground',
  alignItems: 'center',
  height: '100%',
  borderLeft: '$contentBorder'
});

const InnerLink = styled('a', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
  padding: '$1 $2',
  textAlign: 'center',
  borderRadius: '$md',
  color: '$text',
  background: '$background',
  transition: 'background 0.3s',
  '&:hover, &:focus': {
    background: 'rgba(0,0,0,0.05)'
  },
  [`.${darkTheme} &`]: {
    margin: 0,
    padding: '$4',
    height: '100%',
    transition: 'color 0.3s',
    '&:hover, &:focus': {
      color: '$gray',
      background: '$background'
    },
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
