import React, { createContext, useEffect, useState } from 'react';
import { darkTheme } from '@stitches';

export const ThemeContext = createContext();

const getDarkModePreference = () => window.matchMedia('(prefers-color-scheme: dark').matches === true;

const KEY = 'mode';

const storage = {
  get: init => window.localStorage.getItem(KEY) || init,
  set: val => window.localStorage.setItem(KEY, val)
};

const themes = {
  default: 'default',
  dark: darkTheme.className
};

export const ThemeProvider = ({ children }) => {
  const [currentMode, setMode] = useState('default');

  const toggleMode = (mode = null) => {
    document.body.classList.remove(themes[currentMode]);
    if (mode) {
      document.body.classList.add(themes[mode]);
      storage.set(mode);
      return setMode(mode);
    }
    const availableThemes = Object.keys(themes);
    const currentIndex = availableThemes.indexOf(currentMode);
    const nextMode =
      availableThemes[(currentIndex + 1) % availableThemes.length];
    document.body.classList.add(themes[nextMode]);
    storage.set(nextMode);
    return setMode(nextMode);
  };

  useEffect(() => {
    const storedTheme = storage.get();
    if (!storedTheme) {
      const prefersDarkMode = getDarkModePreference();
      if (prefersDarkMode) {
        return toggleMode('dark');
      }
      return toggleMode('default');
    }
    return toggleMode(storedTheme);
  }, []);

  return (
    <ThemeContext.Provider
      value={{ currentMode, toggleMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
