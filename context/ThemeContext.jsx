import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return; // SSR safety

    // Check for stored preference first
    try {
      const storedDarkMode = localStorage.getItem('darkMode');

      if (storedDarkMode !== null) {
        setDarkMode(storedDarkMode === 'true');
        return; // no need to attach media listener when user explicitly chose
      }
    } catch (err) {
      // ignore localStorage errors
    }

    // If no stored preference, use system preference and listen for changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setDarkMode(mediaQuery.matches);

    const handleChange = (e) => {
      setDarkMode(e.matches);
      try {
        localStorage.setItem('darkMode', e.matches);
      } catch (err) {
        // ignore
      }
    };

    // Prefer addEventListener when available
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }

    // Fallback for older browsers
    if (typeof mediaQuery.addListener === 'function') {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      try {
        if (typeof window !== 'undefined') localStorage.setItem('darkMode', next);
      } catch (err) {
        // ignore
      }
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
