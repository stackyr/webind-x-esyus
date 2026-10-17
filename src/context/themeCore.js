import { createContext } from 'react'

export const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {},
  setTheme: () => {},
})

export const THEME_KEY = 'webind_esyus_theme_pref'
