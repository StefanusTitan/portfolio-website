import Link from "next/link";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <h1>My Portfolio</h1>
        <nav>
          <ul>
            <li className="nav-item">
              <Link href="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link href="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link href="/projects">Projects</Link>
            </li>
          </ul>
        </nav>
      </div>
      <style jsx>{`
        header {
          background: linear-gradient(90deg, #e0f7fa, #b2ebf2);
          width: 100%;
        }
        .container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0;
        }
        h1 {
          margin: 0;
          padding-left: 1rem;
        }
        nav {
          flex: 1;
          display: flex;
          justify-content: center;
          padding-right: 200px; /* Offset for h1 width to maintain true center */
        }
        ul {
          display: flex;
          gap: 4rem; /* Increased from 2rem */
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
          color: #f5f5f5;
        }
        nav :global(a) {
          color: inherit;
          text-decoration: none;
          padding: 0.5rem 1rem; /* Added padding to increase clickable area */
          display: block; /* Makes the entire area clickable */
        }
        nav :global(a:hover) {
          text-decoration: none;
          color: #f5f5f5;
        }
      `}</style>
    </header>
  );
};

export default Header;
