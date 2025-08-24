import { useState } from "react";
import Link from "next/link";
import { useTheme } from '../context/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import { useRouter } from "next/navigation";
import Home from "@mui/icons-material/Home";
import Info from "@mui/icons-material/Info";
import Folder from "@mui/icons-material/Folder";
import School from "@mui/icons-material/School";
import ListItemIcon from '@mui/material/ListItemIcon';

const Header = () => {
  const router = useRouter();
  const { darkMode, toggleDarkMode } = useTheme();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (next) => () => setOpen(next);

  const navLinks = [
    { href: '/', label: 'Home', icon: <Home /> },
    { href: '/about', label: 'About Me', icon: <Info /> },
    { href: '/projects', label: 'Projects', icon: <Folder /> },
    { href: '/certifications', label: 'Certifications', icon: <School /> },
  ];

  return (
    <header className="header">
      <div className="container">
        <div className="left">
          <IconButton
            aria-label="open navigation menu"
            onClick={toggleDrawer(true)}
            sx={{ 
              display: { xs: 'inline-flex', md: 'none' }
            }}
          >
            <MenuIcon style={{ color: 'var(--text)' }} />
          </IconButton>
          <nav className="desktop-nav">
            <ul>
              {navLinks.map((l) => (
                <li key={l.href} className="nav-item">
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <button onClick={toggleDarkMode} className="theme-toggle" aria-label="toggle theme">
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        slotProps={{
          paper: { className: 'mui-drawer' }
        }}
      >
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
          <List>
            {navLinks.map((l) => (
              <ListItem key={l.href} disablePadding>
                <ListItemButton onClick={() => router.push(l.href)}>
                  <ListItemIcon>
                    {l.icon}
                  </ListItemIcon>
                  <ListItemText primary={l.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <style jsx>{`
        :root { --header-height: 64px; }

        header {
          position: fixed; /* keep header visible while scrolling */
          top: 0;
          left: 0;
          right: 0;
          height: var(--header-height);
          z-index: 1000; /* sit above page content */
          background: var(--header-bg);
          -webkit-backdrop-filter: blur(24px);
          backdrop-filter: blur(6px);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          width: 100%;
        }
        .container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 0 auto;
          padding: 0 1rem;
          height: 100%; /* ensure inner container fills fixed header height */
        }
        .left {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          height: 100%;
        }
        .desktop-nav ul {
          display: flex;
          gap: 2rem; /* reduced gap between nav items */
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .nav-item {
          font-size: 1.2rem;
          font-weight: bold;
          transition:
            transform 0.2s ease,
            text-shadow 0.2s ease,
            color 0.2s ease;
        }
        .nav-item:hover {
          transform: scale(1.05);
          text-shadow: 0 0 8px #90d5e2;
          color: var(--text);
        }
        nav :global(a) {
          color: var(--text);
          text-decoration: none;
          padding: 0.5rem 0; /* makes entire area clickable vertically */
          display: block; /* Makes the entire area clickable */
        }
        nav :global(a:hover) {
          text-decoration: none;
          color: var(--text);
        }
        .theme-toggle {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem 0;
          color: var(--text);
          font-size: 1.2rem;
          transition: transform 0.2s ease;
        }
        .theme-toggle:hover {
          transform: scale(1.1);
        }

        /* Responsive rules */
        @media (max-width: 768px) {
          .desktop-nav { display: none; }
        }

        /* Drawer theming (MUI) */
        :global(.mui-drawer) {
          background: var(--card-bg) !important;
          color: var(--text) !important;
        }
        /* Ensure drawer icons follow theme text color */
        :global(.mui-drawer .MuiListItemIcon-root),
        :global(.mui-drawer .MuiSvgIcon-root) {
          color: var(--text) !important;
        }
        /* Light mode hover */
        :global(.mui-drawer .MuiListItemButton-root:hover) {
          background-color: rgba(0, 0, 0, 0.06);
        }
        /* Dark mode hover overrides */
        :global([data-theme='dark'] .mui-drawer .MuiListItemButton-root:hover) {
          background-color: rgba(255, 255, 255, 0.08);
        }
      `}</style>
    </header>
  );
};

export default Header;
